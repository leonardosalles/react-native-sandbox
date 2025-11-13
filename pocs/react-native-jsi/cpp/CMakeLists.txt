cmake_minimum_required(VERSION 3.13)
project(NativeMath)

add_library(native_math SHARED NativeMath.cpp)

find_package(ReactAndroid REQUIRED CONFIG)
target_link_libraries(native_math ReactAndroid::jsi)
