import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';
import {
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  REFRESH_TOKEN_KEY,
  EXPIRE_TMIE_KEY,
} from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi, refreshTokenApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  refreshToken?: string;
  roleList: string;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  expireTime: number;
  key: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // token
    refreshToken: undefined,
    // roleList
    roleList: '',
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // token过期时间
    expireTime: 0,
    // Last fetch time
    key: '',
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getReFreshToken(): string {
      return this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY);
    },
    getRoleList(): string {
      return this.roleList !== '' ? this.roleList : getAuthCache<string>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
    getExpireTime(): number {
      return this.expireTime || getAuthCache<number>(EXPIRE_TMIE_KEY);
    },
    getKey(): string {
      return this.key;
    },
  },
  actions: {
    setToken(info: string | undefined, refreshToken: string | undefined, expire: number) {
      const expireTimeSe = expire * 1000 + new Date().getTime();
      this.token = info;
      this.refreshToken = refreshToken;
      this.expireTime = expireTimeSe;
      setAuthCache(TOKEN_KEY, info);
      setAuthCache(REFRESH_TOKEN_KEY, refreshToken);
      setAuthCache(EXPIRE_TMIE_KEY, expireTimeSe);
    },
    setRoleList(roleList: string) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setKey(key: string) {
      this.key = key;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.refreshToken = '';
      this.expireTime = 0;
      this.roleList = '';
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      const { goHome = true, mode, ...loginParams } = params;
      const data = await loginApi(loginParams, mode);
      const { access_token, expires_in, refresh_token } = data;

      // save token
      this.setToken(access_token, refresh_token, expires_in);
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else if (goHome) {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        await router.replace(userInfo.homePath || PageEnum.BASE_HOME);
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo> {
      const userInfo = await getUserInfo();
      const { roleNames } = userInfo;
      this.setUserInfo(userInfo);
      this.setRoleList(roleNames);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async refreshTokenFn() {
      try {
        const data = await refreshTokenApi({
          grant_type: 'refresh_token',
          refresh_token: this.getReFreshToken,
        });
        const { access_token, expires_in, refresh_token } = data;
        // save token
        this.setToken(access_token, refresh_token, expires_in);
      } catch {
        console.log('刷新Token失败');
      }
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      try {
        await doLogout();
      } catch {
        console.log('注销Token失败');
      }
      this.setToken(undefined, undefined, 0);
      this.setSessionTimeout(false);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
