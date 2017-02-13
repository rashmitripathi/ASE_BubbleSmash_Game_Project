package com.example.rashmi.searchapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;

import com.facebook.FacebookSdk;


public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.content_login);

        final Button button = (Button)findViewById(R.id.facebookButton);
        button.setBackgroundResource(R.drawable.circle1);
        button.setCompoundDrawablesWithIntrinsicBounds(0,R.drawable.fb9,0,0);

    }
}
