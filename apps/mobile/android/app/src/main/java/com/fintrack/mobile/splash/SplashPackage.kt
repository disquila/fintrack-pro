package com.fintrack.mobile.splash

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class SplashPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            "SplashModule" -> SplashModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        mapOf(
            "SplashModule" to ReactModuleInfo(
                name = "SplashModule",
                className = "com.fintrack.mobile.splash.SplashModule",
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = false
            )
        )
    }
}
