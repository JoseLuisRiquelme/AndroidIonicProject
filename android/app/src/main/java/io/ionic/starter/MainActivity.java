package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import cl.colabora.contacts.plugin.ContactsPluginPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle saveInstanceState){
    super.onCreate(saveInstanceState);

    registerPlugin(ContactsPluginPlugin.class);
  }

}
