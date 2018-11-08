package chat.berty.core;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;

import core.Core;

public class CoreModule extends ReactContextBaseJavaModule {
    private Logger logger = new Logger("chat.berty.io");
    private String filesDir = "";
    private ReactApplicationContext reactContext;

    public CoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.filesDir = reactContext.getFilesDir().getAbsolutePath();
        this.reactContext = reactContext;
    }

    public String getName() {
        return "CoreModule";
    }

    @ReactMethod
    public void start(Promise promise) {
        try {
            Core.start(this.filesDir, this.logger);
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to start core: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void restart(Promise promise) {
        try {
            Core.restart(this.filesDir);
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to restart core: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void dropDatabase(Promise promise) {
        try {
            Core.dropDatabase(this.filesDir);
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to drop database: %s", err);
            promise.reject(err);
        }
    }


    @ReactMethod
    public void getPort(Promise promise) {
        try {
            Long data = Core.getPort();
            promise.resolve(data.toString());
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to get port: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void getNetworkConfig(Promise promise) {
        try {
            String config = Core.getNetworkConfig();
            promise.resolve(config);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to get network config: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void updateNetworkConfig(String config, Promise promise) {
        try {
            Core.updateNetworkConfig(config);
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to update network config: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void isBotRunning(Promise promise) {
        promise.resolve(Core.isBotRunning());
    }

    @ReactMethod
    public void startBot(Promise promise) {
        try {
            Core.startBot();
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to update start bot: %s", err);
            promise.reject(err);
        }
    }

    @ReactMethod
    public void stopBot(Promise promise) {
        try {
            Core.stopBot();
            promise.resolve(null);
        } catch (Exception err) {
            this.logger.format(Level.ERROR, this.getName(), "Unable to update stop bot: %s", err);
            promise.reject(err);
        }
    }
}