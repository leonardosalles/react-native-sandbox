package com.reactnativejsipoc

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactContext
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
          object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                    PackageList(this).packages.apply {
                      // Adicione pacotes manuais aqui, se necessário
                      // add(MyReactNativePackage())
                    }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
          }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }

    // Load native module
    try {
      System.loadLibrary("native_math")
    } catch (e: UnsatisfiedLinkError) {
      e.printStackTrace()
    }

    // Using JSI to add native method instance
    reactHost.reactInstanceManager.addReactInstanceEventListener { context: ReactContext ->
      val jsContext = context.javaScriptContextHolder
      if (jsContext != null && jsContext.get() != 0L) {
        try {
          println("NativeMath JSI initialized successfully")
        } catch (err: Throwable) {
          println("Failed to initialize NativeMath JSI: ${err.message}")
        }
      }
    }
  }
}
