#pragma once
#include <jsi/jsi.h>

namespace rnjsi {

class RuntimeHolder {
public:
    static void setRuntime(jsi::Runtime &rt);
    static jsi::Runtime* getRuntime();

private:
    static jsi::Runtime* runtime_;
};

} // namespace rnjsi
