package ie.itcarlow.box2ddemo.scene;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferencesManager {
	 private static SharedPreferencesManager mInstance = null;
	 
	 private SharedPreferences mSharedPref;
	 private Activity mActivity;
	  
	 private SharedPreferencesManager(Activity activity){
		 mActivity = activity;
		 mSharedPref = activity.getPreferences(Context.MODE_PRIVATE);
	 }
	  
	 public static SharedPreferencesManager getInstance(Activity activity){
		 if(mInstance == null) {
			 mInstance = new SharedPreferencesManager(activity);
		 }
	 
		 return mInstance;
	 }
	 
	 public void saveMusic(boolean state)
	 {
		 mSharedPref = mActivity.getPreferences(Context.MODE_PRIVATE);
		 SharedPreferences.Editor editor = mSharedPref.edit();		
		 editor.putBoolean("music", state);
		 editor.commit();
	 }
	 
	 public boolean getMusic()
	 {
		 boolean music = mSharedPref.getBoolean("music", true);
		 return music;
	 } 
}
