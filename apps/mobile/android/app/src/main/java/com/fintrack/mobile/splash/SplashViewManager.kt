package com.fintrack.mobile.splash

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ObjectAnimator
import android.app.Activity
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.facebook.react.bridge.UiThreadUtil
import com.fintrack.mobile.R

object SplashViewManager {

    private var splashView: View? = null

    fun show(activity: Activity) {
        UiThreadUtil.runOnUiThread {
            val decorView = activity.window.decorView as? ViewGroup ?: return@runOnUiThread

            val view = activity.layoutInflater.inflate(R.layout.activity_splash, decorView, false)
            splashView = view

            val logo = view.findViewById<ImageView>(R.id.logo)
            val text = view.findViewById<TextView>(R.id.app_name)

            logo.alpha = 0f
            logo.scaleX = 0.6f
            logo.scaleY = 0.6f

            ObjectAnimator.ofFloat(logo, "alpha", 0f, 1f).apply { duration = 1200 }.start()
            ObjectAnimator.ofFloat(logo, "scaleX", 0.6f, 1f).apply { duration = 1200 }.start()
            ObjectAnimator.ofFloat(logo, "scaleY", 0.6f, 1f).apply { duration = 1200 }.start()

            text.translationY = 80f
            text.alpha = 0f

            ObjectAnimator.ofFloat(text, "translationY", 80f, 0f).apply {
                duration = 800; startDelay = 300
            }.start()
            ObjectAnimator.ofFloat(text, "alpha", 0f, 1f).apply {
                duration = 800; startDelay = 300
            }.start()

            decorView.addView(view)
        }
    }

    fun hide() {
        UiThreadUtil.runOnUiThread {
            splashView?.let { view ->
                val screenHeight = view.rootView.height.toFloat()

                val slideUp = ObjectAnimator.ofFloat(view, "translationY", 0f, -screenHeight)
                slideUp.duration = 400

                slideUp.addListener(object : AnimatorListenerAdapter() {
                    override fun onAnimationEnd(animation: Animator) {
                        super.onAnimationEnd(animation)
                        (view.parent as? ViewGroup)?.removeView(view)
                        splashView = null
                    }
                })
                slideUp.start()
            }
        }
    }
}
