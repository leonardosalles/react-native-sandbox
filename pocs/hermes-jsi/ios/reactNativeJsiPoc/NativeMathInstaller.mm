#import <Foundation/Foundation.h>
#import <jsi/jsi.h>

namespace rnjsi {
  void installNativeMath(facebook::jsi::Runtime &runtime);
}

@interface NativeMathInstaller : NSObject
@end

@implementation NativeMathInstaller

+ (void)installWithRuntime:(facebook::jsi::Runtime &)runtime {
  rnjsi::installNativeMath(runtime);
  NSLog(@"✅ NativeMath installed via JSI on iOS");
}

@end
