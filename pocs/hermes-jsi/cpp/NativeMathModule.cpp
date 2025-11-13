#include "NativeMathModule.h"
#include "RuntimeHolder.h"
#include <jsi/jsi.h>

using namespace facebook;

namespace rnjsi {

void installNativeMath(jsi::Runtime &runtime) {
    RuntimeHolder::setRuntime(runtime);
    runtime.global().setProperty(
        runtime,
        "NativeMathAdd",
        jsi::Function::createFromHostFunction(
            runtime,
            jsi::PropNameID::forAscii(runtime, "NativeMathAdd"),
            2,
            [](jsi::Runtime &rt, const jsi::Value &, const jsi::Value* args, size_t count) -> jsi::Value {
                if (count == 2 && args[0].isNumber() && args[1].isNumber()) {
                    return jsi::Value(args[0].asNumber() + args[1].asNumber());
                }
                return jsi::Value(0);
            }
        )
    );
}

jsi::Runtime* getRuntimeForApp() {
    return RuntimeHolder::getRuntime();
}

} // namespace rnjsi
