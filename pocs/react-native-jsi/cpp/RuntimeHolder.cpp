#include "RuntimeHolder.h"

namespace rnjsi {

jsi::Runtime* RuntimeHolder::runtime_ = nullptr;

void RuntimeHolder::setRuntime(jsi::Runtime &rt) {
    runtime_ = &rt;
}

jsi::Runtime* RuntimeHolder::getRuntime() {
    return runtime_;
}

} // namespace rnjsi
