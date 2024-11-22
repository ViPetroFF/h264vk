/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2024 erkserkserks, Viktor PetroFF
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// This content script runs in an isolated environment and cannot modify any
// javascript variables on the youtube page. The purpose of this script is to
// handle user options and pass them them to inject.js via local storage.
// inject.js runs in the main world of the DOM:
// https://developer.chrome.com/docs/extensions/reference/api/scripting#type-ExecutionWorld

// Set defaults for options stored in localStorage
if (localStorage['h264vk-enable'] === undefined) {
  localStorage['h264vk-enable'] = true;
}
if (localStorage['h264vk-block_60fps'] === undefined) {
  localStorage['h264vk-block_60fps'] = false;
}
if (localStorage['h264vk-battery_only'] === undefined) {
  localStorage['h264vk-battery_only'] = false;
}

// Save chrome.storage.local options in localStorage.
// This is needed because chrome.storage.local.get() is async and we want to
// run inject.js immediately.
// See https://bugs.chromium.org/p/chromium/issues/detail?id=54257
chrome.storage.local.get({
  // Set defaults
  enable: true,
  block_60fps: false,
  battery_only: false,
 }, function(options) {
   localStorage['h264vk-enable'] = options.enable;
   localStorage['h264vk-block_60fps'] = options.block_60fps;
   localStorage['h264vk-battery_only'] = options.battery_only;
 }
);
