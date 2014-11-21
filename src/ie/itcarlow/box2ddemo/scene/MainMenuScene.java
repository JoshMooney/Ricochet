package ie.itcarlow.box2ddemo.scene;

import ie.itcarlow.box2ddemo.ResourceManager;

import org.andengine.entity.scene.background.Background;
import org.andengine.entity.scene.menu.MenuScene;
import org.andengine.entity.scene.menu.MenuScene.IOnMenuItemClickListener;
import org.andengine.entity.scene.menu.item.IMenuItem;
import org.andengine.entity.scene.menu.item.SpriteMenuItem;
import org.andengine.entity.scene.menu.item.decorator.ScaleMenuItemDecorator;
import org.andengine.util.color.Color;

public class MainMenuScene extends BaseScene implements IOnMenuItemClickListener
{
	
	private MenuScene menu;
	private final int MENU_PLAY = 0;
	private final int MENU_EXIT = 1;
	
	@Override
	public void createScene() 
	{
		setBackground(new Background(Color.WHITE));		
	}

	@Override
	public void onBackPressed() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void disposeScene() {
		// TODO Auto-generated method stub
		
	}
	
	private void createMenu()
	{
		menu = new MenuScene(camera);
		menu.setPosition(0,0);
		final IMenuItem playItem = new ScaleMenuItemDecorator(new SpriteMenuItem(MENU_PLAY, ResourceManager.getInstance().play_button_region, vbom), 1.2f, 1);
		final IMenuItem exitItem = new ScaleMenuItemDecorator(new SpriteMenuItem(MENU_EXIT, ResourceManager.getInstance().exit_button_region, vbom), 1.2f, 1);
	
		menu.addMenuItem(playItem);
		menu.addMenuItem(exitItem);
		
		menu.buildAnimations();
		menu.setBackgroundEnabled(false);
		playItem.setPosition(playItem.getX(), playItem.getY() + 20);
		exitItem.setPosition(playItem.getX(), playItem.getY() + 75);
		
		menu.setOnMenuItemClickListener(this);
		setChildScene(menu);
	}

	public boolean onMenuItemClicked(MenuScene scene, IMenuItem item, float localX, float localY)
	{
		return false;
	}
}
