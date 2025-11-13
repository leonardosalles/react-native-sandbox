#include "NativeMath.h"
#include <jsi/jsi.h>
#include <iostream>

using namespace facebook;

namespace rnjsi {
  void installNativeMath(jsi::Runtime &runtime) {
    auto add = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "add"),
        2,
        [](jsi::Runtime &rt, const jsi::Value &, const jsi::Value *args, size_t) -> jsi::Value {
          return jsi::Value(args[0].asNumber() + args[1].asNumber());
        });

    auto multiply = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "multiply"),
        2,
        [](jsi::Runtime &rt, const jsi::Value &, const jsi::Value *args, size_t) -> jsi::Value {
          return jsi::Value(args[0].asNumber() * args[1].asNumber());
        });

    jsi::Object nativeMath(runtime);
    nativeMath.setProperty(runtime, "add", add);
    nativeMath.setProperty(runtime, "multiply", multiply);

    runtime.global().setProperty(runtime, "NativeMath", nativeMath);
  }
}
