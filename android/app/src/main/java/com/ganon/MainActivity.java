package com.ganon;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends SplashActivity {
    public void onCreate() {
        // FORCE LTR
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        sharedI18nUtilInstance.allowRTL(getApplicationContext(), true);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    protected String getMainComponentName() {
        return "Ganon";
    }
}
