#import "AppDelegate.h"
#import "NativeMathInstaller.mm"
#import "RuntimeHolder.h"
#import <jsi/jsi.h>

dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    facebook::jsi::Runtime* runtime = rnjsi::getRuntimeForApp();
    if (runtime) {
        [NativeMathInstaller installWithRuntime:*runtime];
    } else {
        NSLog(@"Runtime not initialized");
    }
});
