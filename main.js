(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/zone.js/dist/zone-evergreen.js":
/*!*****************************************************!*\
  !*** ./node_modules/zone.js/dist/zone-evergreen.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
     true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) :
    undefined;
}((function () { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const Zone$1 = (function (global) {
        const performance = global['performance'];
        function mark(name) { performance && performance['mark'] && performance['mark'](name); }
        function performanceMeasure(name, label) {
            performance && performance['measure'] && performance['measure'](name, label);
        }
        mark('Zone');
        // Initialize before it's accessed below.
        // __Zone_symbol_prefix global can be used to override the default zone
        // symbol prefix with a custom one if needed.
        const symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';
        function __symbol__(name) { return symbolPrefix + name; }
        const checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;
        if (global['Zone']) {
            // if global['Zone'] already exists (maybe zone.js was already loaded or
            // some other lib also registered a global object named Zone), we may need
            // to throw an error, but sometimes user may not want this error.
            // For example,
            // we have two web pages, page1 includes zone.js, page2 doesn't.
            // and the 1st time user load page1 and page2, everything work fine,
            // but when user load page2 again, error occurs because global['Zone'] already exists.
            // so we add a flag to let user choose whether to throw this error or not.
            // By default, if existing Zone is from zone.js, we will not throw the error.
            if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
                throw new Error('Zone already loaded.');
            }
            else {
                return global['Zone'];
            }
        }
        class Zone {
            constructor(parent, zoneSpec) {
                this._parent = parent;
                this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
                this._properties = zoneSpec && zoneSpec.properties || {};
                this._zoneDelegate =
                    new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
            }
            static assertZonePatched() {
                if (global['Promise'] !== patches['ZoneAwarePromise']) {
                    throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                        'has been overwritten.\n' +
                        'Most likely cause is that a Promise polyfill has been loaded ' +
                        'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                        'If you must load one, do so before loading zone.js.)');
                }
            }
            static get root() {
                let zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            }
            static get current() { return _currentZoneFrame.zone; }
            static get currentTask() { return _currentTask; }
            // tslint:disable-next-line:require-internal-with-underscore
            static __load_patch(name, fn) {
                if (patches.hasOwnProperty(name)) {
                    if (checkDuplicate) {
                        throw Error('Already loaded patch: ' + name);
                    }
                }
                else if (!global['__Zone_disable_' + name]) {
                    const perfName = 'Zone:' + name;
                    mark(perfName);
                    patches[name] = fn(global, Zone, _api);
                    performanceMeasure(perfName, perfName);
                }
            }
            get parent() { return this._parent; }
            get name() { return this._name; }
            get(key) {
                const zone = this.getZoneWith(key);
                if (zone)
                    return zone._properties[key];
            }
            getZoneWith(key) {
                let current = this;
                while (current) {
                    if (current._properties.hasOwnProperty(key)) {
                        return current;
                    }
                    current = current._parent;
                }
                return null;
            }
            fork(zoneSpec) {
                if (!zoneSpec)
                    throw new Error('ZoneSpec required!');
                return this._zoneDelegate.fork(this, zoneSpec);
            }
            wrap(callback, source) {
                if (typeof callback !== 'function') {
                    throw new Error('Expecting function got: ' + callback);
                }
                const _callback = this._zoneDelegate.intercept(this, callback, source);
                const zone = this;
                return function () {
                    return zone.runGuarded(_callback, this, arguments, source);
                };
            }
            run(callback, applyThis, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runGuarded(callback, applyThis = null, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runTask(task, applyThis, applyArgs) {
                if (task.zone != this) {
                    throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                }
                // https://github.com/angular/zone.js/issues/778, sometimes eventTask
                // will run in notScheduled(canceled) state, we should not try to
                // run such kind of task but just return
                if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                    return;
                }
                const reEntryGuard = task.state != running;
                reEntryGuard && task._transitionTo(running, scheduled);
                task.runCount++;
                const previousTask = _currentTask;
                _currentTask = task;
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                        task.cancelFn = undefined;
                    }
                    try {
                        return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    // if the task's state is notScheduled or unknown, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled && task.state !== unknown) {
                        if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                            reEntryGuard && task._transitionTo(scheduled, running);
                        }
                        else {
                            task.runCount = 0;
                            this._updateTaskCount(task, -1);
                            reEntryGuard &&
                                task._transitionTo(notScheduled, running, notScheduled);
                        }
                    }
                    _currentZoneFrame = _currentZoneFrame.parent;
                    _currentTask = previousTask;
                }
            }
            scheduleTask(task) {
                if (task.zone && task.zone !== this) {
                    // check if the task was rescheduled, the newZone
                    // should not be the children of the original zone
                    let newZone = this;
                    while (newZone) {
                        if (newZone === task.zone) {
                            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
                        }
                        newZone = newZone.parent;
                    }
                }
                task._transitionTo(scheduling, notScheduled);
                const zoneDelegates = [];
                task._zoneDelegates = zoneDelegates;
                task._zone = this;
                try {
                    task = this._zoneDelegate.scheduleTask(this, task);
                }
                catch (err) {
                    // should set task's state to unknown when scheduleTask throw error
                    // because the err may from reschedule, so the fromState maybe notScheduled
                    task._transitionTo(unknown, scheduling, notScheduled);
                    // TODO: @JiaLiPassion, should we check the result from handleError?
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                if (task._zoneDelegates === zoneDelegates) {
                    // we have to check because internally the delegate can reschedule the task.
                    this._updateTaskCount(task, 1);
                }
                if (task.state == scheduling) {
                    task._transitionTo(scheduled, scheduling);
                }
                return task;
            }
            scheduleMicroTask(source, callback, data, customSchedule) {
                return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
            }
            scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
            }
            scheduleEventTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
            }
            cancelTask(task) {
                if (task.zone != this)
                    throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                task._transitionTo(canceling, scheduled, running);
                try {
                    this._zoneDelegate.cancelTask(this, task);
                }
                catch (err) {
                    // if error occurs when cancelTask, transit the state to unknown
                    task._transitionTo(unknown, canceling);
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                this._updateTaskCount(task, -1);
                task._transitionTo(notScheduled, canceling);
                task.runCount = 0;
                return task;
            }
            _updateTaskCount(task, count) {
                const zoneDelegates = task._zoneDelegates;
                if (count == -1) {
                    task._zoneDelegates = null;
                }
                for (let i = 0; i < zoneDelegates.length; i++) {
                    zoneDelegates[i]._updateTaskCount(task.type, count);
                }
            }
        }
        // tslint:disable-next-line:require-internal-with-underscore
        Zone.__symbol__ = __symbol__;
        const DELEGATE_ZS = {
            name: '',
            onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
            onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
            onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
            onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
        };
        class ZoneDelegate {
            constructor(zone, parentDelegate, zoneSpec) {
                this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
                this.zone = zone;
                this._parentDelegate = parentDelegate;
                this._forkZS =
                    zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
                this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
                this._forkCurrZone =
                    zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
                this._interceptZS =
                    zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
                this._interceptDlgt =
                    zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
                this._interceptCurrZone =
                    zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
                this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
                this._invokeDlgt =
                    zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
                this._invokeCurrZone =
                    zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
                this._handleErrorZS =
                    zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
                this._handleErrorDlgt = zoneSpec &&
                    (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
                this._handleErrorCurrZone =
                    zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
                this._scheduleTaskZS =
                    zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
                this._scheduleTaskDlgt = zoneSpec &&
                    (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
                this._scheduleTaskCurrZone = zoneSpec &&
                    (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
                this._invokeTaskZS =
                    zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
                this._invokeTaskDlgt =
                    zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
                this._invokeTaskCurrZone =
                    zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
                this._cancelTaskZS =
                    zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
                this._cancelTaskDlgt =
                    zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
                this._cancelTaskCurrZone =
                    zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
                this._hasTaskZS = null;
                this._hasTaskDlgt = null;
                this._hasTaskDlgtOwner = null;
                this._hasTaskCurrZone = null;
                const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
                const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
                if (zoneSpecHasTask || parentHasTask) {
                    // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                    // a case all task related interceptors must go through this ZD. We can't short circuit it.
                    this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                    this._hasTaskDlgt = parentDelegate;
                    this._hasTaskDlgtOwner = this;
                    this._hasTaskCurrZone = zone;
                    if (!zoneSpec.onScheduleTask) {
                        this._scheduleTaskZS = DELEGATE_ZS;
                        this._scheduleTaskDlgt = parentDelegate;
                        this._scheduleTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onInvokeTask) {
                        this._invokeTaskZS = DELEGATE_ZS;
                        this._invokeTaskDlgt = parentDelegate;
                        this._invokeTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onCancelTask) {
                        this._cancelTaskZS = DELEGATE_ZS;
                        this._cancelTaskDlgt = parentDelegate;
                        this._cancelTaskCurrZone = this.zone;
                    }
                }
            }
            fork(targetZone, zoneSpec) {
                return this._forkZS ?
                    this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                    new Zone(targetZone, zoneSpec);
            }
            intercept(targetZone, callback, source) {
                return this._interceptZS ?
                    this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                    callback;
            }
            invoke(targetZone, callback, applyThis, applyArgs, source) {
                return this._invokeZS ?
                    this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                    callback.apply(applyThis, applyArgs);
            }
            handleError(targetZone, error) {
                return this._handleErrorZS ?
                    this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                    true;
            }
            scheduleTask(targetZone, task) {
                let returnTask = task;
                if (this._scheduleTaskZS) {
                    if (this._hasTaskZS) {
                        returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                    }
                    // clang-format off
                    returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                    // clang-format on
                    if (!returnTask)
                        returnTask = task;
                }
                else {
                    if (task.scheduleFn) {
                        task.scheduleFn(task);
                    }
                    else if (task.type == microTask) {
                        scheduleMicroTask(task);
                    }
                    else {
                        throw new Error('Task is missing scheduleFn.');
                    }
                }
                return returnTask;
            }
            invokeTask(targetZone, task, applyThis, applyArgs) {
                return this._invokeTaskZS ?
                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                    task.callback.apply(applyThis, applyArgs);
            }
            cancelTask(targetZone, task) {
                let value;
                if (this._cancelTaskZS) {
                    value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
                }
                else {
                    if (!task.cancelFn) {
                        throw Error('Task is not cancelable');
                    }
                    value = task.cancelFn(task);
                }
                return value;
            }
            hasTask(targetZone, isEmpty) {
                // hasTask should not throw error so other ZoneDelegate
                // can still trigger hasTask callback
                try {
                    this._hasTaskZS &&
                        this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
                }
                catch (err) {
                    this.handleError(targetZone, err);
                }
            }
            // tslint:disable-next-line:require-internal-with-underscore
            _updateTaskCount(type, count) {
                const counts = this._taskCounts;
                const prev = counts[type];
                const next = counts[type] = prev + count;
                if (next < 0) {
                    throw new Error('More tasks executed then were scheduled.');
                }
                if (prev == 0 || next == 0) {
                    const isEmpty = {
                        microTask: counts['microTask'] > 0,
                        macroTask: counts['macroTask'] > 0,
                        eventTask: counts['eventTask'] > 0,
                        change: type
                    };
                    this.hasTask(this.zone, isEmpty);
                }
            }
        }
        class ZoneTask {
            constructor(type, source, callback, options, scheduleFn, cancelFn) {
                // tslint:disable-next-line:require-internal-with-underscore
                this._zone = null;
                this.runCount = 0;
                // tslint:disable-next-line:require-internal-with-underscore
                this._zoneDelegates = null;
                // tslint:disable-next-line:require-internal-with-underscore
                this._state = 'notScheduled';
                this.type = type;
                this.source = source;
                this.data = options;
                this.scheduleFn = scheduleFn;
                this.cancelFn = cancelFn;
                if (!callback) {
                    throw new Error('callback is not defined');
                }
                this.callback = callback;
                const self = this;
                // TODO: @JiaLiPassion options should have interface
                if (type === eventTask && options && options.useG) {
                    this.invoke = ZoneTask.invokeTask;
                }
                else {
                    this.invoke = function () {
                        return ZoneTask.invokeTask.call(global, self, this, arguments);
                    };
                }
            }
            static invokeTask(task, target, args) {
                if (!task) {
                    task = this;
                }
                _numberOfNestedTaskFrames++;
                try {
                    task.runCount++;
                    return task.zone.runTask(task, target, args);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            }
            get zone() { return this._zone; }
            get state() { return this._state; }
            cancelScheduleRequest() { this._transitionTo(notScheduled, scheduling); }
            // tslint:disable-next-line:require-internal-with-underscore
            _transitionTo(toState, fromState1, fromState2) {
                if (this._state === fromState1 || this._state === fromState2) {
                    this._state = toState;
                    if (toState == notScheduled) {
                        this._zoneDelegates = null;
                    }
                }
                else {
                    throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? ' or \'' + fromState2 + '\'' : ''}, was '${this._state}'.`);
                }
            }
            toString() {
                if (this.data && typeof this.data.handleId !== 'undefined') {
                    return this.data.handleId.toString();
                }
                else {
                    return Object.prototype.toString.call(this);
                }
            }
            // add toJSON method to prevent cyclic error when
            // call JSON.stringify(zoneTask)
            toJSON() {
                return {
                    type: this.type,
                    state: this.state,
                    source: this.source,
                    zone: this.zone.name,
                    runCount: this.runCount
                };
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  MICROTASK QUEUE
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const symbolSetTimeout = __symbol__('setTimeout');
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        let _microTaskQueue = [];
        let _isDrainingMicrotaskQueue = false;
        let nativeMicroTaskQueuePromise;
        function scheduleMicroTask(task) {
            // if we are not running in any task, and there has not been anything scheduled
            // we must bootstrap the initial task creation by manually scheduling the drain
            if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
                // We are not running in Task, so we need to kickstart the microtask queue.
                if (!nativeMicroTaskQueuePromise) {
                    if (global[symbolPromise]) {
                        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                    }
                }
                if (nativeMicroTaskQueuePromise) {
                    let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                    if (!nativeThen) {
                        // native Promise is not patchable, we need to use `then` directly
                        // issue 1078
                        nativeThen = nativeMicroTaskQueuePromise['then'];
                    }
                    nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
                }
                else {
                    global[symbolSetTimeout](drainMicroTaskQueue, 0);
                }
            }
            task && _microTaskQueue.push(task);
        }
        function drainMicroTaskQueue() {
            if (!_isDrainingMicrotaskQueue) {
                _isDrainingMicrotaskQueue = true;
                while (_microTaskQueue.length) {
                    const queue = _microTaskQueue;
                    _microTaskQueue = [];
                    for (let i = 0; i < queue.length; i++) {
                        const task = queue[i];
                        try {
                            task.zone.runTask(task, null, null);
                        }
                        catch (error) {
                            _api.onUnhandledError(error);
                        }
                    }
                }
                _api.microtaskDrainDone();
                _isDrainingMicrotaskQueue = false;
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  BOOTSTRAP
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const NO_ZONE = { name: 'NO ZONE' };
        const notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
        const microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
        const patches = {};
        const _api = {
            symbol: __symbol__,
            currentZoneFrame: () => _currentZoneFrame,
            onUnhandledError: noop,
            microtaskDrainDone: noop,
            scheduleMicroTask: scheduleMicroTask,
            showUncaughtError: () => !Zone[__symbol__('ignoreConsoleErrorUncaughtError')],
            patchEventTarget: () => [],
            patchOnProperties: noop,
            patchMethod: () => noop,
            bindArguments: () => [],
            patchThen: () => noop,
            patchMacroTask: () => noop,
            setNativePromise: (NativePromise) => {
                // sometimes NativePromise.resolve static function
                // is not ready yet, (such as core-js/es6.promise)
                // so we need to check here.
                if (NativePromise && typeof NativePromise.resolve === 'function') {
                    nativeMicroTaskQueuePromise = NativePromise.resolve(0);
                }
            },
            patchEventPrototype: () => noop,
            isIEOrEdge: () => false,
            getGlobalObjects: () => undefined,
            ObjectDefineProperty: () => noop,
            ObjectGetOwnPropertyDescriptor: () => undefined,
            ObjectCreate: () => undefined,
            ArraySlice: () => [],
            patchClass: () => noop,
            wrapWithCurrentZone: () => noop,
            filterProperties: () => [],
            attachOriginToPatched: () => noop,
            _redefineProperty: () => noop,
            patchCallbacks: () => noop
        };
        let _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
        let _currentTask = null;
        let _numberOfNestedTaskFrames = 0;
        function noop() { }
        performanceMeasure('Zone', 'Zone');
        return global['Zone'] = Zone;
    })(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('ZoneAwarePromise', (global, Zone, api) => {
        const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        const ObjectDefineProperty = Object.defineProperty;
        function readableObjectToString(obj) {
            if (obj && obj.toString === Object.prototype.toString) {
                const className = obj.constructor && obj.constructor.name;
                return (className ? className : '') + ': ' + JSON.stringify(obj);
            }
            return obj ? obj.toString() : Object.prototype.toString.call(obj);
        }
        const __symbol__ = api.symbol;
        const _uncaughtPromiseErrors = [];
        const isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        const creationTrace = '__creationTrace__';
        api.onUnhandledError = (e) => {
            if (api.showUncaughtError()) {
                const rejection = e && e.rejection;
                if (rejection) {
                    console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
                }
                else {
                    console.error(e);
                }
            }
        };
        api.microtaskDrainDone = () => {
            while (_uncaughtPromiseErrors.length) {
                const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(() => { throw uncaughtPromiseError; });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            }
        };
        const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
        function handleUnhandledRejection(e) {
            api.onUnhandledError(e);
            try {
                const handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
                if (typeof handler === 'function') {
                    handler.call(this, e);
                }
            }
            catch (err) {
            }
        }
        function isThenable(value) { return value && value.then; }
        function forwardResolution(value) { return value; }
        function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
        const symbolState = __symbol__('state');
        const symbolValue = __symbol__('value');
        const symbolFinally = __symbol__('finally');
        const symbolParentPromiseValue = __symbol__('parentPromiseValue');
        const symbolParentPromiseState = __symbol__('parentPromiseState');
        const source = 'Promise.then';
        const UNRESOLVED = null;
        const RESOLVED = true;
        const REJECTED = false;
        const REJECTED_NO_CATCH = 0;
        function makeResolver(promise, state) {
            return (v) => {
                try {
                    resolvePromise(promise, state, v);
                }
                catch (err) {
                    resolvePromise(promise, false, err);
                }
                // Do not return value or you will break the Promise spec.
            };
        }
        const once = function () {
            let wasCalled = false;
            return function wrapper(wrappedFunction) {
                return function () {
                    if (wasCalled) {
                        return;
                    }
                    wasCalled = true;
                    wrappedFunction.apply(null, arguments);
                };
            };
        };
        const TYPE_ERROR = 'Promise resolved with itself';
        const CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
        // Promise Resolution
        function resolvePromise(promise, state, value) {
            const onceWrapper = once();
            if (promise === value) {
                throw new TypeError(TYPE_ERROR);
            }
            if (promise[symbolState] === UNRESOLVED) {
                // should only get value.then once based on promise spec.
                let then = null;
                try {
                    if (typeof value === 'object' || typeof value === 'function') {
                        then = value && value.then;
                    }
                }
                catch (err) {
                    onceWrapper(() => { resolvePromise(promise, false, err); })();
                    return promise;
                }
                // if (value instanceof ZoneAwarePromise) {
                if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                    value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                    value[symbolState] !== UNRESOLVED) {
                    clearRejectedNoCatch(value);
                    resolvePromise(promise, value[symbolState], value[symbolValue]);
                }
                else if (state !== REJECTED && typeof then === 'function') {
                    try {
                        then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                    }
                    catch (err) {
                        onceWrapper(() => { resolvePromise(promise, false, err); })();
                    }
                }
                else {
                    promise[symbolState] = state;
                    const queue = promise[symbolValue];
                    promise[symbolValue] = value;
                    if (promise[symbolFinally] === symbolFinally) {
                        // the promise is generated by Promise.prototype.finally
                        if (state === RESOLVED) {
                            // the state is resolved, should ignore the value
                            // and use parent promise value
                            promise[symbolState] = promise[symbolParentPromiseState];
                            promise[symbolValue] = promise[symbolParentPromiseValue];
                        }
                    }
                    // record task information in value when error occurs, so we can
                    // do some additional work such as render longStackTrace
                    if (state === REJECTED && value instanceof Error) {
                        // check if longStackTraceZone is here
                        const trace = Zone.currentTask && Zone.currentTask.data &&
                            Zone.currentTask.data[creationTrace];
                        if (trace) {
                            // only keep the long stack trace into error when in longStackTraceZone
                            ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                        }
                    }
                    for (let i = 0; i < queue.length;) {
                        scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                    }
                    if (queue.length == 0 && state == REJECTED) {
                        promise[symbolState] = REJECTED_NO_CATCH;
                        let uncaughtPromiseError = value;
                        if (!isDisableWrappingUncaughtPromiseRejection) {
                            // If disable wrapping uncaught promise reject
                            // and the rejected value is an Error object,
                            // use the value instead of wrapping it.
                            try {
                                // Here we throws a new Error to print more readable error log
                                // and if the value is not an error, zone.js builds an `Error`
                                // Object here to attach the stack information.
                                throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                                    (value && value.stack ? '\n' + value.stack : ''));
                            }
                            catch (err) {
                                uncaughtPromiseError = err;
                            }
                        }
                        uncaughtPromiseError.rejection = value;
                        uncaughtPromiseError.promise = promise;
                        uncaughtPromiseError.zone = Zone.current;
                        uncaughtPromiseError.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(uncaughtPromiseError);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
            // Resolving an already resolved promise is a noop.
            return promise;
        }
        const REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
        function clearRejectedNoCatch(promise) {
            if (promise[symbolState] === REJECTED_NO_CATCH) {
                // if the promise is rejected no catch status
                // and queue.length > 0, means there is a error handler
                // here to handle the rejected promise, we should trigger
                // windows.rejectionhandled eventHandler or nodejs rejectionHandled
                // eventHandler
                try {
                    const handler = Zone[REJECTION_HANDLED_HANDLER];
                    if (handler && typeof handler === 'function') {
                        handler.call(this, { rejection: promise[symbolValue], promise: promise });
                    }
                }
                catch (err) {
                }
                promise[symbolState] = REJECTED;
                for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
                    if (promise === _uncaughtPromiseErrors[i].promise) {
                        _uncaughtPromiseErrors.splice(i, 1);
                    }
                }
            }
        }
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
            clearRejectedNoCatch(promise);
            const promiseState = promise[symbolState];
            const delegate = promiseState ?
                (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
                (typeof onRejected === 'function') ? onRejected : forwardRejection;
            zone.scheduleMicroTask(source, () => {
                try {
                    const parentPromiseValue = promise[symbolValue];
                    const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                    if (isFinallyPromise) {
                        // if the promise is generated from finally call, keep parent promise's state and value
                        chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                        chainPromise[symbolParentPromiseState] = promiseState;
                    }
                    // should not pass value to finally callback
                    const value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                        [] :
                        [parentPromiseValue]);
                    resolvePromise(chainPromise, true, value);
                }
                catch (error) {
                    // if error occurs, should always return this error
                    resolvePromise(chainPromise, false, error);
                }
            }, chainPromise);
        }
        const ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
        const noop = function () { };
        class ZoneAwarePromise {
            static toString() { return ZONE_AWARE_PROMISE_TO_STRING; }
            static resolve(value) {
                return resolvePromise(new this(null), RESOLVED, value);
            }
            static reject(error) {
                return resolvePromise(new this(null), REJECTED, error);
            }
            static race(values) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                function onResolve(value) { resolve(value); }
                function onReject(error) { reject(error); }
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
                return promise;
            }
            static all(values) { return ZoneAwarePromise.allWithCallback(values); }
            static allSettled(values) {
                const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
                return P.allWithCallback(values, {
                    thenCallback: (value) => ({ status: 'fulfilled', value }),
                    errorCallback: (err) => ({ status: 'rejected', reason: err })
                });
            }
            static allWithCallback(values, callback) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                // Start at 2 to prevent prematurely resolving if .then is called immediately.
                let unresolvedCount = 2;
                let valueIndex = 0;
                const resolvedValues = [];
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    const curValueIndex = valueIndex;
                    try {
                        value.then((value) => {
                            resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
                            unresolvedCount--;
                            if (unresolvedCount === 0) {
                                resolve(resolvedValues);
                            }
                        }, (err) => {
                            if (!callback) {
                                reject(err);
                            }
                            else {
                                resolvedValues[curValueIndex] = callback.errorCallback(err);
                                unresolvedCount--;
                                if (unresolvedCount === 0) {
                                    resolve(resolvedValues);
                                }
                            }
                        });
                    }
                    catch (thenErr) {
                        reject(thenErr);
                    }
                    unresolvedCount++;
                    valueIndex++;
                }
                // Make the unresolvedCount zero-based again.
                unresolvedCount -= 2;
                if (unresolvedCount === 0) {
                    resolve(resolvedValues);
                }
                return promise;
            }
            constructor(executor) {
                const promise = this;
                if (!(promise instanceof ZoneAwarePromise)) {
                    throw new Error('Must be an instanceof Promise.');
                }
                promise[symbolState] = UNRESOLVED;
                promise[symbolValue] = []; // queue;
                try {
                    executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
                }
                catch (error) {
                    resolvePromise(promise, false, error);
                }
            }
            get [Symbol.toStringTag]() { return 'Promise'; }
            get [Symbol.species]() { return ZoneAwarePromise; }
            then(onFulfilled, onRejected) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = this.constructor || ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
                }
                return chainPromise;
            }
            catch(onRejected) {
                return this.then(null, onRejected);
            }
            finally(onFinally) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                chainPromise[symbolFinally] = symbolFinally;
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
                }
                return chainPromise;
            }
        }
        // Protect against aggressive optimizers dropping seemingly unused properties.
        // E.g. Closure Compiler in advanced mode.
        ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
        ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
        ZoneAwarePromise['race'] = ZoneAwarePromise.race;
        ZoneAwarePromise['all'] = ZoneAwarePromise.all;
        const NativePromise = global[symbolPromise] = global['Promise'];
        const ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
        let desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
        if (!desc || desc.configurable) {
            desc && delete desc.writable;
            desc && delete desc.value;
            if (!desc) {
                desc = { configurable: true, enumerable: true };
            }
            desc.get = function () {
                // if we already set ZoneAwarePromise, use patched one
                // otherwise return native one.
                return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
            };
            desc.set = function (NewNativePromise) {
                if (NewNativePromise === ZoneAwarePromise) {
                    // if the NewNativePromise is ZoneAwarePromise
                    // save to global
                    global[ZONE_AWARE_PROMISE] = NewNativePromise;
                }
                else {
                    // if the NewNativePromise is not ZoneAwarePromise
                    // for example: after load zone.js, some library just
                    // set es6-promise to global, if we set it to global
                    // directly, assertZonePatched will fail and angular
                    // will not loaded, so we just set the NewNativePromise
                    // to global[symbolPromise], so the result is just like
                    // we load ES6 Promise before zone.js
                    global[symbolPromise] = NewNativePromise;
                    if (!NewNativePromise.prototype[symbolThen]) {
                        patchThen(NewNativePromise);
                    }
                    api.setNativePromise(NewNativePromise);
                }
            };
            ObjectDefineProperty(global, 'Promise', desc);
        }
        global['Promise'] = ZoneAwarePromise;
        const symbolThenPatched = __symbol__('thenPatched');
        function patchThen(Ctor) {
            const proto = Ctor.prototype;
            const prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
            if (prop && (prop.writable === false || !prop.configurable)) {
                // check Ctor.prototype.then propertyDescriptor is writable or not
                // in meteor env, writable is false, we should ignore such case
                return;
            }
            const originalThen = proto.then;
            // Keep a reference to the original method.
            proto[symbolThen] = originalThen;
            Ctor.prototype.then = function (onResolve, onReject) {
                const wrapped = new ZoneAwarePromise((resolve, reject) => { originalThen.call(this, resolve, reject); });
                return wrapped.then(onResolve, onReject);
            };
            Ctor[symbolThenPatched] = true;
        }
        api.patchThen = patchThen;
        function zoneify(fn) {
            return function () {
                let resultPromise = fn.apply(this, arguments);
                if (resultPromise instanceof ZoneAwarePromise) {
                    return resultPromise;
                }
                let ctor = resultPromise.constructor;
                if (!ctor[symbolThenPatched]) {
                    patchThen(ctor);
                }
                return resultPromise;
            };
        }
        if (NativePromise) {
            patchThen(NativePromise);
            const fetch = global['fetch'];
            if (typeof fetch == 'function') {
                global[api.symbol('fetch')] = fetch;
                global['fetch'] = zoneify(fetch);
            }
        }
        // This is not part of public API, but it is useful for tests, so we expose it.
        Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
        return ZoneAwarePromise;
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Suppress closure compiler errors about unknown 'Zone' variable
     * @fileoverview
     * @suppress {undefinedVars,globalThis,missingRequire}
     */
    /// <reference types="node"/>
    // issue #989, to reduce bundle size, use short name
    /** Object.getOwnPropertyDescriptor */
    const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    /** Object.defineProperty */
    const ObjectDefineProperty = Object.defineProperty;
    /** Object.getPrototypeOf */
    const ObjectGetPrototypeOf = Object.getPrototypeOf;
    /** Object.create */
    const ObjectCreate = Object.create;
    /** Array.prototype.slice */
    const ArraySlice = Array.prototype.slice;
    /** addEventListener string const */
    const ADD_EVENT_LISTENER_STR = 'addEventListener';
    /** removeEventListener string const */
    const REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
    /** zoneSymbol addEventListener */
    const ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
    /** zoneSymbol removeEventListener */
    const ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
    /** true string const */
    const TRUE_STR = 'true';
    /** false string const */
    const FALSE_STR = 'false';
    /** Zone symbol prefix string const. */
    const ZONE_SYMBOL_PREFIX = Zone.__symbol__('');
    function wrapWithCurrentZone(callback, source) {
        return Zone.current.wrap(callback, source);
    }
    function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
        return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
    }
    const zoneSymbol = Zone.__symbol__;
    const isWindowExists = typeof window !== 'undefined';
    const internalWindow = isWindowExists ? window : undefined;
    const _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
    const REMOVE_ATTRIBUTE = 'removeAttribute';
    const NULL_ON_PROP_VALUE = [null];
    function bindArguments(args, source) {
        for (let i = args.length - 1; i >= 0; i--) {
            if (typeof args[i] === 'function') {
                args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
            }
        }
        return args;
    }
    function patchPrototype(prototype, fnNames) {
        const source = prototype.constructor['name'];
        for (let i = 0; i < fnNames.length; i++) {
            const name = fnNames[i];
            const delegate = prototype[name];
            if (delegate) {
                const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
                if (!isPropertyWritable(prototypeDesc)) {
                    continue;
                }
                prototype[name] = ((delegate) => {
                    const patched = function () {
                        return delegate.apply(this, bindArguments(arguments, source + '.' + name));
                    };
                    attachOriginToPatched(patched, delegate);
                    return patched;
                })(delegate);
            }
        }
    }
    function isPropertyWritable(propertyDesc) {
        if (!propertyDesc) {
            return true;
        }
        if (propertyDesc.writable === false) {
            return false;
        }
        return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
    }
    const isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]');
    const isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
    // we are in electron of nw, so we are both browser and nodejs
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isMix = typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
        !!(isWindowExists && internalWindow['HTMLElement']);
    const zoneSymbolEventNames = {};
    const wrapFn = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        let eventNameSymbol = zoneSymbolEventNames[event.type];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
        }
        const target = this || event.target || _global;
        const listener = target[eventNameSymbol];
        let result;
        if (isBrowser && target === internalWindow && event.type === 'error') {
            // window.onerror have different signiture
            // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
            // and onerror callback will prevent default when callback return true
            const errorEvent = event;
            result = listener &&
                listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
            if (result === true) {
                event.preventDefault();
            }
        }
        else {
            result = listener && listener.apply(this, arguments);
            if (result != undefined && !result) {
                event.preventDefault();
            }
        }
        return result;
    };
    function patchProperty(obj, prop, prototype) {
        let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
        if (!desc && prototype) {
            // when patch window object, use prototype to check prop exist or not
            const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
            if (prototypeDesc) {
                desc = { enumerable: true, configurable: true };
            }
        }
        // if the descriptor not exists or is not configurable
        // just return
        if (!desc || !desc.configurable) {
            return;
        }
        const onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
        if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
            return;
        }
        // A property descriptor cannot have getter/setter and be writable
        // deleting the writable and value properties avoids this error:
        //
        // TypeError: property descriptors must not specify a value or be writable when a
        // getter or setter has been specified
        delete desc.writable;
        delete desc.value;
        const originalDescGet = desc.get;
        const originalDescSet = desc.set;
        // substr(2) cuz 'onclick' -> 'click', etc
        const eventName = prop.substr(2);
        let eventNameSymbol = zoneSymbolEventNames[eventName];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
        }
        desc.set = function (newValue) {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return;
            }
            let previousValue = target[eventNameSymbol];
            if (previousValue) {
                target.removeEventListener(eventName, wrapFn);
            }
            // issue #978, when onload handler was added before loading zone.js
            // we should remove it with originalDescSet
            if (originalDescSet) {
                originalDescSet.apply(target, NULL_ON_PROP_VALUE);
            }
            if (typeof newValue === 'function') {
                target[eventNameSymbol] = newValue;
                target.addEventListener(eventName, wrapFn, false);
            }
            else {
                target[eventNameSymbol] = null;
            }
        };
        // The getter would return undefined for unassigned properties but the default value of an
        // unassigned property is null
        desc.get = function () {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return null;
            }
            const listener = target[eventNameSymbol];
            if (listener) {
                return listener;
            }
            else if (originalDescGet) {
                // result will be null when use inline event attribute,
                // such as <button onclick="func();">OK</button>
                // because the onclick function is internal raw uncompiled handler
                // the onclick will be evaluated when first time event was triggered or
                // the property is accessed, https://github.com/angular/zone.js/issues/525
                // so we should use original native get to retrieve the handler
                let value = originalDescGet && originalDescGet.call(this);
                if (value) {
                    desc.set.call(this, value);
                    if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                        target.removeAttribute(prop);
                    }
                    return value;
                }
            }
            return null;
        };
        ObjectDefineProperty(obj, prop, desc);
        obj[onPropPatchedSymbol] = true;
    }
    function patchOnProperties(obj, properties, prototype) {
        if (properties) {
            for (let i = 0; i < properties.length; i++) {
                patchProperty(obj, 'on' + properties[i], prototype);
            }
        }
        else {
            const onProperties = [];
            for (const prop in obj) {
                if (prop.substr(0, 2) == 'on') {
                    onProperties.push(prop);
                }
            }
            for (let j = 0; j < onProperties.length; j++) {
                patchProperty(obj, onProperties[j], prototype);
            }
        }
    }
    const originalInstanceKey = zoneSymbol('originalInstance');
    // wrap some native API on `window`
    function patchClass(className) {
        const OriginalClass = _global[className];
        if (!OriginalClass)
            return;
        // keep original class in global
        _global[zoneSymbol(className)] = OriginalClass;
        _global[className] = function () {
            const a = bindArguments(arguments, className);
            switch (a.length) {
                case 0:
                    this[originalInstanceKey] = new OriginalClass();
                    break;
                case 1:
                    this[originalInstanceKey] = new OriginalClass(a[0]);
                    break;
                case 2:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                    break;
                case 3:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                    break;
                case 4:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                    break;
                default:
                    throw new Error('Arg list too long.');
            }
        };
        // attach original delegate to patched function
        attachOriginToPatched(_global[className], OriginalClass);
        const instance = new OriginalClass(function () { });
        let prop;
        for (prop in instance) {
            // https://bugs.webkit.org/show_bug.cgi?id=44721
            if (className === 'XMLHttpRequest' && prop === 'responseBlob')
                continue;
            (function (prop) {
                if (typeof instance[prop] === 'function') {
                    _global[className].prototype[prop] = function () {
                        return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                    };
                }
                else {
                    ObjectDefineProperty(_global[className].prototype, prop, {
                        set: function (fn) {
                            if (typeof fn === 'function') {
                                this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                                // keep callback in wrapped function so we can
                                // use it in Function.prototype.toString to return
                                // the native one.
                                attachOriginToPatched(this[originalInstanceKey][prop], fn);
                            }
                            else {
                                this[originalInstanceKey][prop] = fn;
                            }
                        },
                        get: function () { return this[originalInstanceKey][prop]; }
                    });
                }
            }(prop));
        }
        for (prop in OriginalClass) {
            if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
                _global[className][prop] = OriginalClass[prop];
            }
        }
    }
    function copySymbolProperties(src, dest) {
        if (typeof Object.getOwnPropertySymbols !== 'function') {
            return;
        }
        const symbols = Object.getOwnPropertySymbols(src);
        symbols.forEach((symbol) => {
            const desc = Object.getOwnPropertyDescriptor(src, symbol);
            Object.defineProperty(dest, symbol, {
                get: function () { return src[symbol]; },
                set: function (value) {
                    if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                        // if src[symbol] is not writable or not have a setter, just return
                        return;
                    }
                    src[symbol] = value;
                },
                enumerable: desc ? desc.enumerable : true,
                configurable: desc ? desc.configurable : true
            });
        });
    }
    let shouldCopySymbolProperties = false;
    function patchMethod(target, name, patchFn) {
        let proto = target;
        while (proto && !proto.hasOwnProperty(name)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && target[name]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = target;
        }
        const delegateName = zoneSymbol(name);
        let delegate = null;
        if (proto && !(delegate = proto[delegateName])) {
            delegate = proto[delegateName] = proto[name];
            // check whether proto[name] is writable
            // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
            const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
            if (isPropertyWritable(desc)) {
                const patchDelegate = patchFn(delegate, delegateName, name);
                proto[name] = function () { return patchDelegate(this, arguments); };
                attachOriginToPatched(proto[name], delegate);
                if (shouldCopySymbolProperties) {
                    copySymbolProperties(delegate, proto[name]);
                }
            }
        }
        return delegate;
    }
    // TODO: @JiaLiPassion, support cancel task later if necessary
    function patchMacroTask(obj, funcName, metaCreator) {
        let setNative = null;
        function scheduleTask(task) {
            const data = task.data;
            data.args[data.cbIdx] = function () { task.invoke.apply(this, arguments); };
            setNative.apply(data.target, data.args);
            return task;
        }
        setNative = patchMethod(obj, funcName, (delegate) => function (self, args) {
            const meta = metaCreator(self, args);
            if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
                return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(self, args);
            }
        });
    }
    function attachOriginToPatched(patched, original) {
        patched[zoneSymbol('OriginalDelegate')] = original;
    }
    let isDetectedIEOrEdge = false;
    let ieOrEdge = false;
    function isIE() {
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
                return true;
            }
        }
        catch (error) {
        }
        return false;
    }
    function isIEOrEdge() {
        if (isDetectedIEOrEdge) {
            return ieOrEdge;
        }
        isDetectedIEOrEdge = true;
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
                ieOrEdge = true;
            }
        }
        catch (error) {
        }
        return ieOrEdge;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // override Function.prototype.toString to make zone.js patched function
    // look like native function
    Zone.__load_patch('toString', (global) => {
        // patch Func.prototype.toString to let them look like native
        const originalFunctionToString = Function.prototype.toString;
        const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
        const PROMISE_SYMBOL = zoneSymbol('Promise');
        const ERROR_SYMBOL = zoneSymbol('Error');
        const newFunctionToString = function toString() {
            if (typeof this === 'function') {
                const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
                if (originalDelegate) {
                    if (typeof originalDelegate === 'function') {
                        return originalFunctionToString.call(originalDelegate);
                    }
                    else {
                        return Object.prototype.toString.call(originalDelegate);
                    }
                }
                if (this === Promise) {
                    const nativePromise = global[PROMISE_SYMBOL];
                    if (nativePromise) {
                        return originalFunctionToString.call(nativePromise);
                    }
                }
                if (this === Error) {
                    const nativeError = global[ERROR_SYMBOL];
                    if (nativeError) {
                        return originalFunctionToString.call(nativeError);
                    }
                }
            }
            return originalFunctionToString.call(this);
        };
        newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
        Function.prototype.toString = newFunctionToString;
        // patch Object.prototype.toString to let them look like native
        const originalObjectToString = Object.prototype.toString;
        const PROMISE_OBJECT_TO_STRING = '[object Promise]';
        Object.prototype.toString = function () {
            if (this instanceof Promise) {
                return PROMISE_OBJECT_TO_STRING;
            }
            return originalObjectToString.call(this);
        };
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let passiveSupported = false;
    if (typeof window !== 'undefined') {
        try {
            const options = Object.defineProperty({}, 'passive', { get: function () { passiveSupported = true; } });
            window.addEventListener('test', options, options);
            window.removeEventListener('test', options, options);
        }
        catch (err) {
            passiveSupported = false;
        }
    }
    // an identifier to tell ZoneTask do not create a new invoke closure
    const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
        useG: true
    };
    const zoneSymbolEventNames$1 = {};
    const globalSources = {};
    const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
    const IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
    function prepareEventNames(eventName, eventNameToString) {
        const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
        const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
        const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    function patchEventTarget(_global, apis, patchOptions) {
        const ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
        const REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
        const LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
        const REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
        const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
        const ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
        const PREPEND_EVENT_LISTENER = 'prependListener';
        const PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
        const invokeTask = function (task, target, event) {
            // for better performance, check isRemoved which is set
            // by removeEventListener
            if (task.isRemoved) {
                return;
            }
            const delegate = task.callback;
            if (typeof delegate === 'object' && delegate.handleEvent) {
                // create the bind version of handleEvent when invoke
                task.callback = (event) => delegate.handleEvent(event);
                task.originalDelegate = delegate;
            }
            // invoke static task.invoke
            task.invoke(task, target, [event]);
            const options = task.options;
            if (options && typeof options === 'object' && options.once) {
                // if options.once is true, after invoke once remove listener here
                // only browser need to do this, nodejs eventEmitter will cal removeListener
                // inside EventEmitter.once
                const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = false
        const globalZoneAwareCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = true
        const globalZoneAwareCaptureCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        function patchEventTargetMethods(obj, patchOptions) {
            if (!obj) {
                return false;
            }
            let useGlobalCallback = true;
            if (patchOptions && patchOptions.useG !== undefined) {
                useGlobalCallback = patchOptions.useG;
            }
            const validateHandler = patchOptions && patchOptions.vh;
            let checkDuplicate = true;
            if (patchOptions && patchOptions.chkDup !== undefined) {
                checkDuplicate = patchOptions.chkDup;
            }
            let returnTarget = false;
            if (patchOptions && patchOptions.rt !== undefined) {
                returnTarget = patchOptions.rt;
            }
            let proto = obj;
            while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
                proto = ObjectGetPrototypeOf(proto);
            }
            if (!proto && obj[ADD_EVENT_LISTENER]) {
                // somehow we did not find it, but we can see it. This happens on IE for Window properties.
                proto = obj;
            }
            if (!proto) {
                return false;
            }
            if (proto[zoneSymbolAddEventListener]) {
                return false;
            }
            const eventNameToString = patchOptions && patchOptions.eventNameToString;
            // a shared global taskData to pass data for scheduleEventTask
            // so we do not need to create a new object just for pass some data
            const taskData = {};
            const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
            const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
                proto[REMOVE_EVENT_LISTENER];
            const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
                proto[LISTENERS_EVENT_LISTENER];
            const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
                proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
            let nativePrependEventListener;
            if (patchOptions && patchOptions.prepend) {
                nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                    proto[patchOptions.prepend];
            }
            /**
             * This util function will build an option object with passive option
             * to handle all possible input from the user.
             */
            function buildEventListenerOptions(options, passive) {
                if (!passiveSupported && typeof options === 'object' && options) {
                    // doesn't support passive but user want to pass an object as options.
                    // this will not work on some old browser, so we just pass a boolean
                    // as useCapture parameter
                    return !!options.capture;
                }
                if (!passiveSupported || !passive) {
                    return options;
                }
                if (typeof options === 'boolean') {
                    return { capture: options, passive: true };
                }
                if (!options) {
                    return { passive: true };
                }
                if (typeof options === 'object' && options.passive !== false) {
                    return Object.assign(Object.assign({}, options), { passive: true });
                }
                return options;
            }
            const customScheduleGlobal = function (task) {
                // if there is already a task for the eventName + capture,
                // just return, because we use the shared globalZoneAwareCallback here.
                if (taskData.isExisting) {
                    return;
                }
                return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
            };
            const customCancelGlobal = function (task) {
                // if task is not marked as isRemoved, this call is directly
                // from Zone.prototype.cancelTask, we should remove the task
                // from tasksList of target first
                if (!task.isRemoved) {
                    const symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                    let symbolEventName;
                    if (symbolEventNames) {
                        symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                    }
                    const existingTasks = symbolEventName && task.target[symbolEventName];
                    if (existingTasks) {
                        for (let i = 0; i < existingTasks.length; i++) {
                            const existingTask = existingTasks[i];
                            if (existingTask === task) {
                                existingTasks.splice(i, 1);
                                // set isRemoved to data for faster invokeTask check
                                task.isRemoved = true;
                                if (existingTasks.length === 0) {
                                    // all tasks for the eventName + capture have gone,
                                    // remove globalZoneAwareCallback and remove the task cache from target
                                    task.allRemoved = true;
                                    task.target[symbolEventName] = null;
                                }
                                break;
                            }
                        }
                    }
                }
                // if all tasks for the eventName + capture have gone,
                // we will really remove the global event callback,
                // if not, return
                if (!task.allRemoved) {
                    return;
                }
                return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
            };
            const customScheduleNonGlobal = function (task) {
                return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customSchedulePrepend = function (task) {
                return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customCancelNonGlobal = function (task) {
                return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
            };
            const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
            const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
            const compareTaskCallbackVsDelegate = function (task, delegate) {
                const typeOfDelegate = typeof delegate;
                return (typeOfDelegate === 'function' && task.callback === delegate) ||
                    (typeOfDelegate === 'object' && task.originalDelegate === delegate);
            };
            const compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
            const blackListedEvents = Zone[zoneSymbol('BLACK_LISTED_EVENTS')];
            const passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];
            const makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget = false, prepend = false) {
                return function () {
                    const target = this || _global;
                    let eventName = arguments[0];
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    let delegate = arguments[1];
                    if (!delegate) {
                        return nativeListener.apply(this, arguments);
                    }
                    if (isNode && eventName === 'uncaughtException') {
                        // don't patch uncaughtException of nodejs to prevent endless loop
                        return nativeListener.apply(this, arguments);
                    }
                    // don't create the bind delegate function for handleEvent
                    // case here to improve addEventListener performance
                    // we will create the bind delegate when invoke
                    let isHandleEvent = false;
                    if (typeof delegate !== 'function') {
                        if (!delegate.handleEvent) {
                            return nativeListener.apply(this, arguments);
                        }
                        isHandleEvent = true;
                    }
                    if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                        return;
                    }
                    const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                    const options = buildEventListenerOptions(arguments[2], passive);
                    if (blackListedEvents) {
                        // check black list
                        for (let i = 0; i < blackListedEvents.length; i++) {
                            if (eventName === blackListedEvents[i]) {
                                if (passive) {
                                    return nativeListener.call(target, eventName, delegate, options);
                                }
                                else {
                                    return nativeListener.apply(this, arguments);
                                }
                            }
                        }
                    }
                    const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                    const once = options && typeof options === 'object' ? options.once : false;
                    const zone = Zone.current;
                    let symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (!symbolEventNames) {
                        prepareEventNames(eventName, eventNameToString);
                        symbolEventNames = zoneSymbolEventNames$1[eventName];
                    }
                    const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                    let existingTasks = target[symbolEventName];
                    let isExisting = false;
                    if (existingTasks) {
                        // already have task registered
                        isExisting = true;
                        if (checkDuplicate) {
                            for (let i = 0; i < existingTasks.length; i++) {
                                if (compare(existingTasks[i], delegate)) {
                                    // same callback, same capture, same event name, just return
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        existingTasks = target[symbolEventName] = [];
                    }
                    let source;
                    const constructorName = target.constructor['name'];
                    const targetSource = globalSources[constructorName];
                    if (targetSource) {
                        source = targetSource[eventName];
                    }
                    if (!source) {
                        source = constructorName + addSource +
                            (eventNameToString ? eventNameToString(eventName) : eventName);
                    }
                    // do not create a new object as task.data to pass those things
                    // just use the global shared one
                    taskData.options = options;
                    if (once) {
                        // if addEventListener with once options, we don't pass it to
                        // native addEventListener, instead we keep the once setting
                        // and handle ourselves.
                        taskData.options.once = false;
                    }
                    taskData.target = target;
                    taskData.capture = capture;
                    taskData.eventName = eventName;
                    taskData.isExisting = isExisting;
                    const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                    // keep taskData into data to allow onScheduleEventTask to access the task information
                    if (data) {
                        data.taskData = taskData;
                    }
                    const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                    // should clear taskData.target to avoid memory leak
                    // issue, https://github.com/angular/angular/issues/20442
                    taskData.target = null;
                    // need to clear up taskData because it is a global object
                    if (data) {
                        data.taskData = null;
                    }
                    // have to save those information to task in case
                    // application may call task.zone.cancelTask() directly
                    if (once) {
                        options.once = true;
                    }
                    if (!(!passiveSupported && typeof task.options === 'boolean')) {
                        // if not support passive, and we pass an option object
                        // to addEventListener, we should save the options to task
                        task.options = options;
                    }
                    task.target = target;
                    task.capture = capture;
                    task.eventName = eventName;
                    if (isHandleEvent) {
                        // save original delegate for compare to check duplicate
                        task.originalDelegate = delegate;
                    }
                    if (!prepend) {
                        existingTasks.push(task);
                    }
                    else {
                        existingTasks.unshift(task);
                    }
                    if (returnTarget) {
                        return target;
                    }
                };
            };
            proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
            if (nativePrependEventListener) {
                proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
            }
            proto[REMOVE_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const options = arguments[2];
                const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                const delegate = arguments[1];
                if (!delegate) {
                    return nativeRemoveEventListener.apply(this, arguments);
                }
                if (validateHandler &&
                    !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                    return;
                }
                const symbolEventNames = zoneSymbolEventNames$1[eventName];
                let symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                const existingTasks = symbolEventName && target[symbolEventName];
                if (existingTasks) {
                    for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (compare(existingTask, delegate)) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            existingTask.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                existingTask.allRemoved = true;
                                target[symbolEventName] = null;
                                // in the target, we have an event listener which is added by on_property
                                // such as target.onclick = function() {}, so we need to clear this internal
                                // property too if all delegates all removed
                                if (typeof eventName === 'string') {
                                    const onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                    target[onPropertySymbol] = null;
                                }
                            }
                            existingTask.zone.cancelTask(existingTask);
                            if (returnTarget) {
                                return target;
                            }
                            return;
                        }
                    }
                }
                // issue 930, didn't find the event name or callback
                // from zone kept existingTasks, the callback maybe
                // added outside of zone, we need to call native removeEventListener
                // to try to remove it.
                return nativeRemoveEventListener.apply(this, arguments);
            };
            proto[LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const listeners = [];
                const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];
                    let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    listeners.push(delegate);
                }
                return listeners;
            };
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (!eventName) {
                    const keys = Object.keys(target);
                    for (let i = 0; i < keys.length; i++) {
                        const prop = keys[i];
                        const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                        let evtName = match && match[1];
                        // in nodejs EventEmitter, removeListener event is
                        // used for monitoring the removeListener call,
                        // so just keep removeListener eventListener until
                        // all other eventListeners are removed
                        if (evtName && evtName !== 'removeListener') {
                            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                        }
                    }
                    // remove removeListener listener finally
                    this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
                }
                else {
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    const symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (symbolEventNames) {
                        const symbolEventName = symbolEventNames[FALSE_STR];
                        const symbolCaptureEventName = symbolEventNames[TRUE_STR];
                        const tasks = target[symbolEventName];
                        const captureTasks = target[symbolCaptureEventName];
                        if (tasks) {
                            const removeTasks = tasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                        if (captureTasks) {
                            const removeTasks = captureTasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                    }
                }
                if (returnTarget) {
                    return this;
                }
            };
            // for native toString patch
            attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
            attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
            if (nativeRemoveAllListeners) {
                attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
            }
            if (nativeListeners) {
                attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
            }
            return true;
        }
        let results = [];
        for (let i = 0; i < apis.length; i++) {
            results[i] = patchEventTargetMethods(apis[i], patchOptions);
        }
        return results;
    }
    function findEventTasks(target, eventName) {
        if (!eventName) {
            const foundTasks = [];
            for (let prop in target) {
                const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                let evtName = match && match[1];
                if (evtName && (!eventName || evtName === eventName)) {
                    const tasks = target[prop];
                    if (tasks) {
                        for (let i = 0; i < tasks.length; i++) {
                            foundTasks.push(tasks[i]);
                        }
                    }
                }
            }
            return foundTasks;
        }
        let symbolEventName = zoneSymbolEventNames$1[eventName];
        if (!symbolEventName) {
            prepareEventNames(eventName);
            symbolEventName = zoneSymbolEventNames$1[eventName];
        }
        const captureFalseTasks = target[symbolEventName[FALSE_STR]];
        const captureTrueTasks = target[symbolEventName[TRUE_STR]];
        if (!captureFalseTasks) {
            return captureTrueTasks ? captureTrueTasks.slice() : [];
        }
        else {
            return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) :
                captureFalseTasks.slice();
        }
    }
    function patchEventPrototype(global, api) {
        const Event = global['Event'];
        if (Event && Event.prototype) {
            api.patchMethod(Event.prototype, 'stopImmediatePropagation', (delegate) => function (self, args) {
                self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
                // we need to call the native stopImmediatePropagation
                // in case in some hybrid application, some part of
                // application will be controlled by zone, some are not
                delegate && delegate.apply(self, args);
            });
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCallbacks(api, target, targetName, method, callbacks) {
        const symbol = Zone.__symbol__(method);
        if (target[symbol]) {
            return;
        }
        const nativeDelegate = target[symbol] = target[method];
        target[method] = function (name, opts, options) {
            if (opts && opts.prototype) {
                callbacks.forEach(function (callback) {
                    const source = `${targetName}.${method}::` + callback;
                    const prototype = opts.prototype;
                    if (prototype.hasOwnProperty(callback)) {
                        const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                        if (descriptor && descriptor.value) {
                            descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                            api._redefineProperty(opts.prototype, callback, descriptor);
                        }
                        else if (prototype[callback]) {
                            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                        }
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                });
            }
            return nativeDelegate.call(target, name, opts, options);
        };
        api.attachOriginToPatched(target[method], nativeDelegate);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const globalEventHandlersEventNames = [
        'abort',
        'animationcancel',
        'animationend',
        'animationiteration',
        'auxclick',
        'beforeinput',
        'blur',
        'cancel',
        'canplay',
        'canplaythrough',
        'change',
        'compositionstart',
        'compositionupdate',
        'compositionend',
        'cuechange',
        'click',
        'close',
        'contextmenu',
        'curechange',
        'dblclick',
        'drag',
        'dragend',
        'dragenter',
        'dragexit',
        'dragleave',
        'dragover',
        'drop',
        'durationchange',
        'emptied',
        'ended',
        'error',
        'focus',
        'focusin',
        'focusout',
        'gotpointercapture',
        'input',
        'invalid',
        'keydown',
        'keypress',
        'keyup',
        'load',
        'loadstart',
        'loadeddata',
        'loadedmetadata',
        'lostpointercapture',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mousewheel',
        'orientationchange',
        'pause',
        'play',
        'playing',
        'pointercancel',
        'pointerdown',
        'pointerenter',
        'pointerleave',
        'pointerlockchange',
        'mozpointerlockchange',
        'webkitpointerlockerchange',
        'pointerlockerror',
        'mozpointerlockerror',
        'webkitpointerlockerror',
        'pointermove',
        'pointout',
        'pointerover',
        'pointerup',
        'progress',
        'ratechange',
        'reset',
        'resize',
        'scroll',
        'seeked',
        'seeking',
        'select',
        'selectionchange',
        'selectstart',
        'show',
        'sort',
        'stalled',
        'submit',
        'suspend',
        'timeupdate',
        'volumechange',
        'touchcancel',
        'touchmove',
        'touchstart',
        'touchend',
        'transitioncancel',
        'transitionend',
        'waiting',
        'wheel'
    ];
    const documentEventNames = [
        'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
        'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
        'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
        'visibilitychange', 'resume'
    ];
    const windowEventNames = [
        'absolutedeviceorientation',
        'afterinput',
        'afterprint',
        'appinstalled',
        'beforeinstallprompt',
        'beforeprint',
        'beforeunload',
        'devicelight',
        'devicemotion',
        'deviceorientation',
        'deviceorientationabsolute',
        'deviceproximity',
        'hashchange',
        'languagechange',
        'message',
        'mozbeforepaint',
        'offline',
        'online',
        'paint',
        'pageshow',
        'pagehide',
        'popstate',
        'rejectionhandled',
        'storage',
        'unhandledrejection',
        'unload',
        'userproximity',
        'vrdisplayconnected',
        'vrdisplaydisconnected',
        'vrdisplaypresentchange'
    ];
    const htmlElementEventNames = [
        'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
        'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
        'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
    ];
    const mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
    const ieElementEventNames = [
        'activate',
        'afterupdate',
        'ariarequest',
        'beforeactivate',
        'beforedeactivate',
        'beforeeditfocus',
        'beforeupdate',
        'cellchange',
        'controlselect',
        'dataavailable',
        'datasetchanged',
        'datasetcomplete',
        'errorupdate',
        'filterchange',
        'layoutcomplete',
        'losecapture',
        'move',
        'moveend',
        'movestart',
        'propertychange',
        'resizeend',
        'resizestart',
        'rowenter',
        'rowexit',
        'rowsdelete',
        'rowsinserted',
        'command',
        'compassneedscalibration',
        'deactivate',
        'help',
        'mscontentzoom',
        'msmanipulationstatechanged',
        'msgesturechange',
        'msgesturedoubletap',
        'msgestureend',
        'msgesturehold',
        'msgesturestart',
        'msgesturetap',
        'msgotpointercapture',
        'msinertiastart',
        'mslostpointercapture',
        'mspointercancel',
        'mspointerdown',
        'mspointerenter',
        'mspointerhover',
        'mspointerleave',
        'mspointermove',
        'mspointerout',
        'mspointerover',
        'mspointerup',
        'pointerout',
        'mssitemodejumplistitemremoved',
        'msthumbnailclick',
        'stop',
        'storagecommit'
    ];
    const webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
    const formEventNames = ['autocomplete', 'autocompleteerror'];
    const detailEventNames = ['toggle'];
    const frameEventNames = ['load'];
    const frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
    const marqueeEventNames = ['bounce', 'finish', 'start'];
    const XMLHttpRequestEventNames = [
        'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
        'readystatechange'
    ];
    const IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
    const websocketEventNames = ['close', 'error', 'open', 'message'];
    const workerEventNames = ['error', 'message'];
    const eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
    function filterProperties(target, onProperties, ignoreProperties) {
        if (!ignoreProperties || ignoreProperties.length === 0) {
            return onProperties;
        }
        const tip = ignoreProperties.filter(ip => ip.target === target);
        if (!tip || tip.length === 0) {
            return onProperties;
        }
        const targetIgnoreProperties = tip[0].ignoreProperties;
        return onProperties.filter(op => targetIgnoreProperties.indexOf(op) === -1);
    }
    function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
        // check whether target is available, sometimes target will be undefined
        // because different browser or some 3rd party plugin.
        if (!target) {
            return;
        }
        const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
        patchOnProperties(target, filteredProperties, prototype);
    }
    function propertyDescriptorPatch(api, _global) {
        if (isNode && !isMix) {
            return;
        }
        if (Zone[api.symbol('patchEvents')]) {
            // events are already been patched by legacy patch.
            return;
        }
        const supportsWebSocket = typeof WebSocket !== 'undefined';
        const ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            const internalWindow = window;
            const ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            const HTMLMarqueeElement = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement) {
                patchFilteredProperties(HTMLMarqueeElement.prototype, marqueeEventNames, ignoreProperties);
            }
            const Worker = internalWindow['Worker'];
            if (Worker) {
                patchFilteredProperties(Worker.prototype, workerEventNames, ignoreProperties);
            }
        }
        const XMLHttpRequest = _global['XMLHttpRequest'];
        if (XMLHttpRequest) {
            // XMLHttpRequest is not available in ServiceWorker, so we need to check here
            patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        const XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('util', (global, Zone, api) => {
        api.patchOnProperties = patchOnProperties;
        api.patchMethod = patchMethod;
        api.bindArguments = bindArguments;
        api.patchMacroTask = patchMacroTask;
        // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
        // define which events will not be patched by `Zone.js`.
        // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
        // the name consistent with angular repo.
        // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
        // backwards compatibility.
        const SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
        const SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
        if (global[SYMBOL_UNPATCHED_EVENTS]) {
            global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
        }
        if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
            Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
                global[SYMBOL_BLACK_LISTED_EVENTS];
        }
        api.patchEventPrototype = patchEventPrototype;
        api.patchEventTarget = patchEventTarget;
        api.isIEOrEdge = isIEOrEdge;
        api.ObjectDefineProperty = ObjectDefineProperty;
        api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
        api.ObjectCreate = ObjectCreate;
        api.ArraySlice = ArraySlice;
        api.patchClass = patchClass;
        api.wrapWithCurrentZone = wrapWithCurrentZone;
        api.filterProperties = filterProperties;
        api.attachOriginToPatched = attachOriginToPatched;
        api._redefineProperty = Object.defineProperty;
        api.patchCallbacks = patchCallbacks;
        api.getGlobalObjects = () => ({ globalSources, zoneSymbolEventNames: zoneSymbolEventNames$1, eventNames, isBrowser, isMix, isNode, TRUE_STR,
            FALSE_STR, ZONE_SYMBOL_PREFIX, ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR });
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const taskSymbol = zoneSymbol('zoneTask');
    function patchTimer(window, setName, cancelName, nameSuffix) {
        let setNative = null;
        let clearNative = null;
        setName += nameSuffix;
        cancelName += nameSuffix;
        const tasksByHandleId = {};
        function scheduleTask(task) {
            const data = task.data;
            function timer() {
                try {
                    task.invoke.apply(this, arguments);
                }
                finally {
                    // issue-934, task will be cancelled
                    // even it is a periodic task such as
                    // setInterval
                    if (!(task.data && task.data.isPeriodic)) {
                        if (typeof data.handleId === 'number') {
                            // in non-nodejs env, we remove timerId
                            // from local cache
                            delete tasksByHandleId[data.handleId];
                        }
                        else if (data.handleId) {
                            // Node returns complex objects as handleIds
                            // we remove task reference from timer object
                            data.handleId[taskSymbol] = null;
                        }
                    }
                }
            }
            data.args[0] = timer;
            data.handleId = setNative.apply(window, data.args);
            return task;
        }
        function clearTask(task) { return clearNative(task.data.handleId); }
        setNative =
            patchMethod(window, setName, (delegate) => function (self, args) {
                if (typeof args[0] === 'function') {
                    const options = {
                        isPeriodic: nameSuffix === 'Interval',
                        delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                            undefined,
                        args: args
                    };
                    const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                    if (!task) {
                        return task;
                    }
                    // Node.js must additionally support the ref and unref functions.
                    const handle = task.data.handleId;
                    if (typeof handle === 'number') {
                        // for non nodejs env, we save handleId: task
                        // mapping in local cache for clearTimeout
                        tasksByHandleId[handle] = task;
                    }
                    else if (handle) {
                        // for nodejs env, we save task
                        // reference in timerId Object for clearTimeout
                        handle[taskSymbol] = task;
                    }
                    // check whether handle is null, because some polyfill or browser
                    // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                    if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                        typeof handle.unref === 'function') {
                        task.ref = handle.ref.bind(handle);
                        task.unref = handle.unref.bind(handle);
                    }
                    if (typeof handle === 'number' || handle) {
                        return handle;
                    }
                    return task;
                }
                else {
                    // cause an error by calling it directly.
                    return delegate.apply(window, args);
                }
            });
        clearNative =
            patchMethod(window, cancelName, (delegate) => function (self, args) {
                const id = args[0];
                let task;
                if (typeof id === 'number') {
                    // non nodejs env.
                    task = tasksByHandleId[id];
                }
                else {
                    // nodejs env.
                    task = id && id[taskSymbol];
                    // other environments.
                    if (!task) {
                        task = id;
                    }
                }
                if (task && typeof task.type === 'string') {
                    if (task.state !== 'notScheduled' &&
                        (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                        if (typeof id === 'number') {
                            delete tasksByHandleId[id];
                        }
                        else if (id) {
                            id[taskSymbol] = null;
                        }
                        // Do not cancel already canceled functions
                        task.zone.cancelTask(task);
                    }
                }
                else {
                    // cause an error by calling it directly.
                    delegate.apply(window, args);
                }
            });
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCustomElements(_global, api) {
        const { isBrowser, isMix } = api.getGlobalObjects();
        if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
            return;
        }
        const callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
        api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function eventTargetPatch(_global, api) {
        if (Zone[api.symbol('patchEventTarget')]) {
            // EventTarget is already patched.
            return;
        }
        const { eventNames, zoneSymbolEventNames, TRUE_STR, FALSE_STR, ZONE_SYMBOL_PREFIX } = api.getGlobalObjects();
        //  predefine all __zone_symbol__ + eventName + true/false string
        for (let i = 0; i < eventNames.length; i++) {
            const eventName = eventNames[i];
            const falseEventName = eventName + FALSE_STR;
            const trueEventName = eventName + TRUE_STR;
            const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
            const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {};
            zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        const EVENT_TARGET = _global['EventTarget'];
        if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
            return;
        }
        api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
        return true;
    }
    function patchEvent(global, api) {
        api.patchEventPrototype(global, api);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('legacy', (global) => {
        const legacyPatch = global[Zone.__symbol__('legacyPatch')];
        if (legacyPatch) {
            legacyPatch();
        }
    });
    Zone.__load_patch('timers', (global) => {
        const set = 'set';
        const clear = 'clear';
        patchTimer(global, set, clear, 'Timeout');
        patchTimer(global, set, clear, 'Interval');
        patchTimer(global, set, clear, 'Immediate');
    });
    Zone.__load_patch('requestAnimationFrame', (global) => {
        patchTimer(global, 'request', 'cancel', 'AnimationFrame');
        patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
        patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
    });
    Zone.__load_patch('blocking', (global, Zone) => {
        const blockingMethods = ['alert', 'prompt', 'confirm'];
        for (let i = 0; i < blockingMethods.length; i++) {
            const name = blockingMethods[i];
            patchMethod(global, name, (delegate, symbol, name) => {
                return function (s, args) {
                    return Zone.current.run(delegate, global, args, name);
                };
            });
        }
    });
    Zone.__load_patch('EventTarget', (global, Zone, api) => {
        patchEvent(global, api);
        eventTargetPatch(global, api);
        // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
        const XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
            api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
        }
        patchClass('MutationObserver');
        patchClass('WebKitMutationObserver');
        patchClass('IntersectionObserver');
        patchClass('FileReader');
    });
    Zone.__load_patch('on_property', (global, Zone, api) => {
        propertyDescriptorPatch(api, global);
    });
    Zone.__load_patch('customElements', (global, Zone, api) => {
        patchCustomElements(global, api);
    });
    Zone.__load_patch('XHR', (global, Zone) => {
        // Treat XMLHttpRequest as a macrotask.
        patchXHR(global);
        const XHR_TASK = zoneSymbol('xhrTask');
        const XHR_SYNC = zoneSymbol('xhrSync');
        const XHR_LISTENER = zoneSymbol('xhrListener');
        const XHR_SCHEDULED = zoneSymbol('xhrScheduled');
        const XHR_URL = zoneSymbol('xhrURL');
        const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
        function patchXHR(window) {
            const XMLHttpRequest = window['XMLHttpRequest'];
            if (!XMLHttpRequest) {
                // XMLHttpRequest is not available in service worker
                return;
            }
            const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
            function findPendingTask(target) { return target[XHR_TASK]; }
            let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
            let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            if (!oriAddListener) {
                const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget) {
                    const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                    oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
            }
            const READY_STATE_CHANGE = 'readystatechange';
            const SCHEDULED = 'scheduled';
            function scheduleTask(task) {
                const data = task.data;
                const target = data.target;
                target[XHR_SCHEDULED] = false;
                target[XHR_ERROR_BEFORE_SCHEDULED] = false;
                // remove existing event listener
                const listener = target[XHR_LISTENER];
                if (!oriAddListener) {
                    oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
                if (listener) {
                    oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                }
                const newListener = target[XHR_LISTENER] = () => {
                    if (target.readyState === target.DONE) {
                        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                        // readyState=4 multiple times, so we need to check task state here
                        if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            // check whether the xhr has registered onload listener
                            // if that is the case, the task should invoke after all
                            // onload listeners finish.
                            const loadTasks = target[Zone.__symbol__('loadfalse')];
                            if (loadTasks && loadTasks.length > 0) {
                                const oriInvoke = task.invoke;
                                task.invoke = function () {
                                    // need to load the tasks again, because in other
                                    // load listener, they may remove themselves
                                    const loadTasks = target[Zone.__symbol__('loadfalse')];
                                    for (let i = 0; i < loadTasks.length; i++) {
                                        if (loadTasks[i] === task) {
                                            loadTasks.splice(i, 1);
                                        }
                                    }
                                    if (!data.aborted && task.state === SCHEDULED) {
                                        oriInvoke.call(task);
                                    }
                                };
                                loadTasks.push(task);
                            }
                            else {
                                task.invoke();
                            }
                        }
                        else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                            // error occurs when xhr.send()
                            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                        }
                    }
                };
                oriAddListener.call(target, READY_STATE_CHANGE, newListener);
                const storedTask = target[XHR_TASK];
                if (!storedTask) {
                    target[XHR_TASK] = task;
                }
                sendNative.apply(target, data.args);
                target[XHR_SCHEDULED] = true;
                return task;
            }
            function placeholderCallback() { }
            function clearTask(task) {
                const data = task.data;
                // Note - ideally, we would call data.target.removeEventListener here, but it's too late
                // to prevent it from firing. So instead, we store info for the event listener.
                data.aborted = true;
                return abortNative.apply(data.target, data.args);
            }
            const openNative = patchMethod(XMLHttpRequestPrototype, 'open', () => function (self, args) {
                self[XHR_SYNC] = args[2] == false;
                self[XHR_URL] = args[1];
                return openNative.apply(self, args);
            });
            const XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
            const fetchTaskAborting = zoneSymbol('fetchTaskAborting');
            const fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
            const sendNative = patchMethod(XMLHttpRequestPrototype, 'send', () => function (self, args) {
                if (Zone.current[fetchTaskScheduling] === true) {
                    // a fetch is scheduling, so we are using xhr to polyfill fetch
                    // and because we already schedule macroTask for fetch, we should
                    // not schedule a macroTask for xhr again
                    return sendNative.apply(self, args);
                }
                if (self[XHR_SYNC]) {
                    // if the XHR is sync there is no task to schedule, just execute the code.
                    return sendNative.apply(self, args);
                }
                else {
                    const options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                    const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                    if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                        task.state === SCHEDULED) {
                        // xhr request throw error when send
                        // we should invoke task instead of leaving a scheduled
                        // pending macroTask
                        task.invoke();
                    }
                }
            });
            const abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', () => function (self, args) {
                const task = findPendingTask(self);
                if (task && typeof task.type == 'string') {
                    // If the XHR has already completed, do nothing.
                    // If the XHR has already been aborted, do nothing.
                    // Fix #569, call abort multiple times before done will cause
                    // macroTask task count be negative number
                    if (task.cancelFn == null || (task.data && task.data.aborted)) {
                        return;
                    }
                    task.zone.cancelTask(task);
                }
                else if (Zone.current[fetchTaskAborting] === true) {
                    // the abort is called from fetch polyfill, we need to call native abort of XHR.
                    return abortNative.apply(self, args);
                }
                // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
                // task
                // to cancel. Do nothing.
            });
        }
    });
    Zone.__load_patch('geolocation', (global) => {
        /// GEO_LOCATION
        if (global['navigator'] && global['navigator'].geolocation) {
            patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
        }
    });
    Zone.__load_patch('PromiseRejectionEvent', (global, Zone) => {
        // handle unhandled promise rejection
        function findPromiseRejectionHandler(evtName) {
            return function (e) {
                const eventTasks = findEventTasks(global, evtName);
                eventTasks.forEach(eventTask => {
                    // windows has added unhandledrejection event listener
                    // trigger the event listener
                    const PromiseRejectionEvent = global['PromiseRejectionEvent'];
                    if (PromiseRejectionEvent) {
                        const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                        eventTask.invoke(evt);
                    }
                });
            };
        }
        if (global['PromiseRejectionEvent']) {
            Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
                findPromiseRejectionHandler('unhandledrejection');
            Zone[zoneSymbol('rejectionHandledHandler')] =
                findPromiseRejectionHandler('rejectionhandled');
        }
    });

})));


/***/ }),

/***/ "./src/app/about/about.component.ts":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_skills_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/skills.service */ "./src/app/services/skills.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/back-icon/back-icon.component */ "./src/app/ui/back-icon/back-icon.component.ts");
/* harmony import */ var _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dp-logo/dp-logo.component */ "./src/app/dp-logo/dp-logo.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");







function AboutComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](skill_r1.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](skill_r1.names.join(", "));
} }
const _c0 = function () { return ["/aboutmore"]; };
class AboutComponent {
    constructor(skillsService, router) {
        this.skillsService = skillsService;
        this.router = router;
    }
    ngOnInit() {
        this.skills = this.skillsService.getSkills();
    }
    onBackClick() {
        this.router.navigateByUrl('/');
    }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_skills_service__WEBPACK_IMPORTED_MODULE_1__["SkillsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], decls: 25, vars: 3, consts: [[1, "back-icon", 3, "click"], [1, "overlay"], [1, "container"], [1, "side1"], [1, "skill-header"], ["height", "13rem", "width", "13rem", 1, "dp-logo"], [1, "text-container"], ["role", "button", 1, "button", "button0", 3, "routerLink"], [1, "side2"], [1, "skill-container"], [4, "ngFor", "ngForOf"], [1, "skill-type"], [1, "skill-names"]], template: function AboutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AboutComponent_Template_div_click_0_listener() { return ctx.onBackClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-back-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "ABOUT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-dp-logo", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " I am Surya Raj. You can also call me a Product Designer, Developer, System Architect or by any other market defined function-title. I prefer to keep learning, continue challenging myself and do the cool things that matter. My abundant energy fuels me in the pursuit of many interests, hobbies, areas of study and artistic endeavors. I\u2019m a fast learner, able to pick up new skills and juggle different projects and roles with relative ease. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " I like to develop expertise in several areas throughout my life and career. I currently work remotely and have a full-time commitment at GSAS MicroSystems. Outside of my commitments I work with a select freelance client base. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " I genuinely care about people, and love helping fellow designers work on their craft. Feel free to get in touch by any means of communication. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Read more");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " SKILLS ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, AboutComponent_div_24_Template, 5, 2, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.skills);
    } }, directives: [_ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_3__["BackIconComponent"], _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_4__["DpLogoComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: [".overlay[_ngcontent-%COMP%] {\n  display: inline-block;\n  height: 100vh;\n  width: 100vw;\n  top: 0;\n  left: -100%;\n  position: fixed;\n  background: #000;\n  transform: scale(2) skew(-10deg);\n  z-index: -1;\n  transition: 0.3s all ease-in-out;\n}\n@media (max-width: 1040px) {\n  .overlay[_ngcontent-%COMP%] {\n    transform: scale(2) skew(-55deg);\n  }\n}\n.container[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  color: #f8f8f8;\n  align-items: center;\n  padding: 5rem;\n}\n@media (max-width: 1040px) {\n  .container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.container[_ngcontent-%COMP%]   .side1[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (max-width: 1040px) {\n  .container[_ngcontent-%COMP%]   .side1[_ngcontent-%COMP%] {\n    flex: none;\n    height: auto;\n  }\n}\n.container[_ngcontent-%COMP%]   .side1[_ngcontent-%COMP%]    > h1[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  padding: 3rem 0.8rem 0.2rem;\n}\n.container[_ngcontent-%COMP%]   .side2[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.text-container[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 32rem;\n  background: #8b0000;\n  padding: 3rem 1.8rem;\n  padding-top: 5.8rem;\n  border-radius: 2rem;\n  min-width: 34rem;\n}\n.dp-logo[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  transform: translate(0, 45%);\n}\n.button[_ngcontent-%COMP%] {\n  background-color: #405ca1;\n  border: none;\n  color: white;\n  padding: 10px 24px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 18px;\n  margin: 4px 2px;\n  transition-duration: 0.4s;\n  border-radius: 100rem;\n  cursor: pointer;\n}\n.button0[_ngcontent-%COMP%] {\n  background-color: #8b0000;\n  color: white;\n  border: 2px solid white;\n  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.button0[_ngcontent-%COMP%]:hover {\n  background-color: white;\n  color: #8b0000;\n}\n.skill-container[_ngcontent-%COMP%] {\n  padding: 3rem 1.8rem;\n  margin-left: 5rem;\n}\n@media (max-width: 1040px) {\n  .skill-container[_ngcontent-%COMP%] {\n    margin: auto;\n  }\n}\n.skill-header[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n  margin-bottom: 3.8rem;\n  position: relative;\n  letter-spacing: 2px;\n  padding-bottom: 0rem;\n  font-size: 3.2rem;\n  font-family: \"Cormorant Garamond\", serif;\n  justify-content: flex-start;\n}\n.skill-header[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 100%;\n  height: 3px;\n  top: 100%;\n  left: 0;\n  background: #f8f8f8;\n}\n.skill-type[_ngcontent-%COMP%] {\n  position: relative;\n  margin: 1.2rem 0;\n  padding-bottom: 0.2rem;\n  font-size: 1.6rem;\n}\n.skill-type[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 70%;\n  height: 1.5px;\n  top: 100%;\n  left: 0;\n  background: #f8f8f8;\n}\n.skill-names[_ngcontent-%COMP%] {\n  margin-left: 2.8rem;\n  margin-bottom: 2rem;\n  margin-top: -0.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL192YXIuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkNSTztFRFNQLGdDQUFBO0VBQ0EsV0FBQTtFQUNBLGdDQUFBO0FBRkY7QUFHRTtFQVhGO0lBWUksZ0NBQUE7RUFBRjtBQUNGO0FBR0E7RUFDRSxpQkFBQTtFQUVBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtFQUNBLGNDbkJVO0VEb0JWLG1CQUFBO0VBQ0EsYUFBQTtBQURGO0FBRUU7RUFWRjtJQVdJLHNCQUFBO0VBQ0Y7QUFDRjtBQUFFO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUVKO0FBREk7RUFORjtJQU9JLFVBQUE7SUFDQSxZQUFBO0VBSUo7QUFDRjtBQUhJO0VBQ0UsZ0JBQUE7RUFDQSwyQkFBQTtBQUtOO0FBRkU7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBSUo7QUFBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQzFETztFRDJEUCxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQUdGO0FBQUE7RUFDRSxpQkFBQTtFQUNBLDRCQUFBO0FBR0Y7QUFBQTtFQUNFLHlCQ3hFUztFRHlFVCxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUVBLHFCQUFBO0VBQ0EsZUFBQTtBQUVGO0FBQUE7RUFDRSx5QkN0Rk87RUR1RlAsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsNkVBQUE7QUFHRjtBQUFBO0VBQ0UsdUJBQUE7RUFDQSxjQzlGTztBRGlHVDtBQUFBO0VBQ0Usb0JBQUE7RUFDQSxpQkFBQTtBQUdGO0FBRkU7RUFIRjtJQUlJLFlBQUE7RUFLRjtBQUNGO0FBRkE7RUFDRSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHdDQUFBO0VBQ0EsMkJBQUE7QUFLRjtBQUpFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsbUJDcEhRO0FEMEhaO0FBRkE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtBQUtGO0FBSkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxtQkNySVE7QUQySVo7QUFGQTtFQUNFLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUtGIiwiZmlsZSI6InNyYy9hcHAvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi92YXInO1xuJHRleHQtY2FyZC1zaGlmdDo0NSU7XG4kcm93LWNvbG91bS1icmstcG9pbnQ6ICdtYXgtd2lkdGg6IDEwNDBweCc7XG4ub3ZlcmxheSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xuICB0b3A6IDA7XG4gIGxlZnQ6IC0xMDAlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJhY2tncm91bmQ6ICRjb2xvcjI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMikgc2tldygtMTBkZWcpO1xuICB6LWluZGV4OiAtMTtcbiAgdHJhbnNpdGlvbjogMC4zcyBhbGwgZWFzZS1pbi1vdXQ7XG4gIEBtZWRpYSAoJHJvdy1jb2xvdW0tYnJrLXBvaW50KSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyKSBza2V3KC01NWRlZyk7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICAvL2hlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAxMDB2dztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGNvbG9yOiAkb2ZmLXdoaXRlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA1cmVtO1xuICBAbWVkaWEgKCRyb3ctY29sb3VtLWJyay1wb2ludCkge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbiAgLnNpZGUxIHtcbiAgICBmbGV4OiAxO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBAbWVkaWEgKCRyb3ctY29sb3VtLWJyay1wb2ludCkge1xuICAgICAgZmxleDogbm9uZTtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICB9XG4gICAgJj5oMSB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgcGFkZGluZzogM3JlbSAwLjhyZW0gMC4ycmVtO1xuICAgIH1cbiAgfVxuICAuc2lkZTIge1xuICAgIGZsZXg6IDE7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG59XG5cbi50ZXh0LWNvbnRhaW5lciB7XG4gIGhlaWdodDogYXV0bztcbiAgbWF4LXdpZHRoOiAzMnJlbTtcbiAgYmFja2dyb3VuZDogJGNvbG9yMTtcbiAgcGFkZGluZzogM3JlbSAxLjhyZW07XG4gIHBhZGRpbmctdG9wOiA1LjhyZW07XG4gIGJvcmRlci1yYWRpdXM6IDJyZW07XG4gIG1pbi13aWR0aDogMzRyZW07XG59XG5cbi5kcC1sb2dvIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDQ1JSk7XG59XG5cbi5idXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmctY29sb3I7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbWFyZ2luOiA0cHggMnB4O1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjRzO1xuICAvL2JvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogMTAwcmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uYnV0dG9uMCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjE7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDE2cHggMCByZ2JhKDAsMCwwLDAuMiksIDAgNnB4IDIwcHggMCByZ2JhKDAsMCwwLDAuMTkpO1xufVxuXG4uYnV0dG9uMDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogJGNvbG9yMTtcbn1cblxuLnNraWxsLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDNyZW0gMS44cmVtO1xuICBtYXJnaW4tbGVmdDogNXJlbTtcbiAgQG1lZGlhICgkcm93LWNvbG91bS1icmstcG9pbnQpIHtcbiAgICBtYXJnaW46IGF1dG87XG4gIH1cbn1cblxuLnNraWxsLWhlYWRlciB7XG4gIG1hcmdpbjogMnJlbSAwO1xuICBtYXJnaW4tYm90dG9tOiAzLjhyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbiAgcGFkZGluZy1ib3R0b206IDByZW07XG4gIGZvbnQtc2l6ZTogMy4ycmVtO1xuICBmb250LWZhbWlseTogJ0Nvcm1vcmFudCBHYXJhbW9uZCcsIHNlcmlmO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICY6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAzcHg7XG4gICAgdG9wOiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZDogJG9mZi13aGl0ZTtcbiAgfVxufVxuXG4uc2tpbGwtdHlwZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAxLjJyZW0gMDtcbiAgcGFkZGluZy1ib3R0b206IDAuMnJlbTtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gICY6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDcwJTtcbiAgICBoZWlnaHQ6IDEuNXB4O1xuICAgIHRvcDogMTAwJTtcbiAgICBsZWZ0OiAwO1xuICAgIGJhY2tncm91bmQ6ICRvZmYtd2hpdGU7XG4gIH1cbn1cblxuLnNraWxsLW5hbWVzIHtcbiAgbWFyZ2luLWxlZnQ6IDIuOHJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgbWFyZ2luLXRvcDogLTAuNnJlbTtcbn1cbiIsIiRiZy1jb2xvcjogIzQwNWNhMTtcbiRjb2xvcjE6ICM4YjAwMDA7XG4kY29sb3IyOiAjMDAwO1xuJGNvbG9yMzogIzgwMDAwMDtcbiRjb2xvcjQ6ICM4YjAwMDA7XG4kdGV4dC1jb2xvcjogI2ZmZmZmZjtcbiRibGFjazogIzU1NTtcbiRvZmYtd2hpdGU6ICNmOGY4Zjg7XG4kd2hpdGU6ICNmZmY7XG4kZGFyazogIzAwMDtcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-about',
                templateUrl: './about.component.html',
                styleUrls: ['./about.component.scss']
            }]
    }], function () { return [{ type: _services_skills_service__WEBPACK_IMPORTED_MODULE_1__["SkillsService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/aboutmore/aboutmore.component.ts":
/*!**************************************************!*\
  !*** ./src/app/aboutmore/aboutmore.component.ts ***!
  \**************************************************/
/*! exports provided: AboutMoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutMoreComponent", function() { return AboutMoreComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/back-icon/back-icon.component */ "./src/app/ui/back-icon/back-icon.component.ts");
/* harmony import */ var _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dp-logo/dp-logo.component */ "./src/app/dp-logo/dp-logo.component.ts");





class AboutMoreComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    onBackClick() {
        this.router.navigateByUrl('/');
    }
}
AboutMoreComponent.ɵfac = function AboutMoreComponent_Factory(t) { return new (t || AboutMoreComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
AboutMoreComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutMoreComponent, selectors: [["app-aboutmore"]], decls: 17, vars: 0, consts: [[1, "back-icon", 3, "click"], [1, "overlay"], [1, "container"], [1, "side"], [1, "skill-header"], ["height", "18rem", "width", "18rem", 1, "dp-logo"], [1, "text-container"], [2, "text-align", "justify"]], template: function AboutMoreComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AboutMoreComponent_Template_div_click_0_listener() { return ctx.onBackClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-back-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "ABOUT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-dp-logo", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Surya Raj is a highly motivated and goal-oriented individual seeking to further his knowledge and experience in any way, shape or form possible. He is an avid learner, quick on his feet, and calm under pressure. He is exceedingly patient and inventive and looks for opportunities available to enhance his Character. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Surya Raj prefers being the one who takes control of situations. He is likely ready to take the lead and be assertive when voicing his opinions. He prefers sticking to what he is familiar with times, and also willing to try something new. He is happy to take a conventional approach to his work, but will likely to change his approach on occasion. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Surya Raj is energized by working in an environment that encourages positively contributing to society. Work with a humanitarian focus is his priority. He feels engaged and satisfied in the workplace if it focuses on social wellbeing. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_2__["BackIconComponent"], _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_3__["DpLogoComponent"]], styles: [".overlay[_ngcontent-%COMP%] {\n  display: inline-block;\n  height: 100vh;\n  width: 100vw;\n  top: 0;\n  left: -100%;\n  position: fixed;\n  background: #000;\n  transform: scale(2) skew(-10deg);\n  z-index: -1;\n  transition: 0.3s all ease-in-out;\n}\n@media (max-width: 1040px) {\n  .overlay[_ngcontent-%COMP%] {\n    transform: scale(2) skew(-55deg);\n  }\n}\n.container[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  height: 100vh;\n  width: 100vw;\n  justify-content: space-around;\n  color: #f8f8f8;\n  align-items: center;\n  padding: 5rem;\n}\n@media (max-width: 1040px) {\n  .container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.container[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (max-width: 1040px) {\n  .container[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%] {\n    flex: none;\n    height: auto;\n  }\n}\n.container[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%]    > h1[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  padding: 3rem 0.8rem 0.2rem;\n}\n.text-container[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90rem;\n  background: #8b0000;\n  padding: 3rem 1.8rem;\n  padding-top: 8.8rem;\n  border-radius: 2rem;\n  min-width: 92;\n}\n.dp-logo[_ngcontent-%COMP%] {\n  font-size: 4.6rem;\n  transform: translate(0, 45%);\n}\n.skill-header[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n  margin-bottom: 3.8rem;\n  position: relative;\n  letter-spacing: 2px;\n  padding-bottom: 0rem;\n  font-size: 3.2rem;\n  font-family: \"Cormorant Garamond\", serif;\n  justify-content: flex-start;\n}\n.skill-header[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 100%;\n  height: 3px;\n  top: 100%;\n  left: 0;\n  background: #f8f8f8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWJvdXRtb3JlL2Fib3V0bW9yZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBO0VBQ0UscUJBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQ1RPO0VEVVAsZ0NBQUE7RUFDQSxXQUFBO0VBQ0EsZ0NBQUE7QUFIRjtBQUlFO0VBWEY7SUFZSSxnQ0FBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGNDbEJVO0VEbUJWLG1CQUFBO0VBQ0EsYUFBQTtBQURGO0FBRUU7RUFSRjtJQVNJLHNCQUFBO0VBQ0Y7QUFDRjtBQUFFO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUVKO0FBREk7RUFORjtJQU9JLFVBQUE7SUFDQSxZQUFBO0VBSUo7QUFDRjtBQUhJO0VBQ0UsZ0JBQUE7RUFDQSwyQkFBQTtBQUtOO0FBQUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkNsRE87RURtRFAsb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUdGO0FBQUE7RUFDRSxpQkFBQTtFQUNBLDRCQUFBO0FBR0Y7QUFBQTtFQUNFLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esd0NBQUE7RUFDQSwyQkFBQTtBQUdGO0FBRkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxtQkN6RVE7QUQ2RVoiLCJmaWxlIjoic3JjL2FwcC9hYm91dG1vcmUvYWJvdXRtb3JlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vdmFyJztcbiR0ZXh0LWNhcmQtc2hpZnQ6NDUlO1xuJHJvdy1jb2xvdW0tYnJrLXBvaW50OiAnbWF4LXdpZHRoOiAxMDQwcHgnO1xuXG4ub3ZlcmxheSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xuICB0b3A6IDA7XG4gIGxlZnQ6IC0xMDAlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJhY2tncm91bmQ6ICRjb2xvcjI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMikgc2tldygtMTBkZWcpO1xuICB6LWluZGV4OiAtMTtcbiAgdHJhbnNpdGlvbjogMC4zcyBhbGwgZWFzZS1pbi1vdXQ7XG4gIEBtZWRpYSAoJHJvdy1jb2xvdW0tYnJrLXBvaW50KSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyKSBza2V3KC01NWRlZyk7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwdnc7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBjb2xvcjogJG9mZi13aGl0ZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogNXJlbTtcbiAgQG1lZGlhICgkcm93LWNvbG91bS1icmstcG9pbnQpIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG4gIC5zaWRlIHtcbiAgICBmbGV4OiAxO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBAbWVkaWEgKCRyb3ctY29sb3VtLWJyay1wb2ludCkge1xuICAgICAgZmxleDogbm9uZTtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICB9XG4gICAgJj5oMSB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgcGFkZGluZzogM3JlbSAwLjhyZW0gMC4ycmVtO1xuICAgIH1cbiAgfVxufVxuXG4udGV4dC1jb250YWluZXIge1xuICBoZWlnaHQ6IGF1dG87XG4gIG1heC13aWR0aDogOTByZW07XG4gIGJhY2tncm91bmQ6ICRjb2xvcjE7XG4gIHBhZGRpbmc6IDNyZW0gMS44cmVtO1xuICBwYWRkaW5nLXRvcDogOC44cmVtO1xuICBib3JkZXItcmFkaXVzOiAycmVtO1xuICBtaW4td2lkdGg6IDkyO1xufVxuXG4uZHAtbG9nbyB7XG4gIGZvbnQtc2l6ZTogNC42cmVtO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA0NSUpO1xufVxuXG4uc2tpbGwtaGVhZGVyIHtcbiAgbWFyZ2luOiAycmVtIDA7XG4gIG1hcmdpbi1ib3R0b206IDMuOHJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICBwYWRkaW5nLWJvdHRvbTogMHJlbTtcbiAgZm9udC1zaXplOiAzLjJyZW07XG4gIGZvbnQtZmFtaWx5OiAnQ29ybW9yYW50IEdhcmFtb25kJywgc2VyaWY7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgJjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDNweDtcbiAgICB0b3A6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICBiYWNrZ3JvdW5kOiAkb2ZmLXdoaXRlO1xuICB9XG59XG4iLCIkYmctY29sb3I6ICM0MDVjYTE7XG4kY29sb3IxOiAjOGIwMDAwO1xuJGNvbG9yMjogIzAwMDtcbiRjb2xvcjM6ICM4MDAwMDA7XG4kY29sb3I0OiAjOGIwMDAwO1xuJHRleHQtY29sb3I6ICNmZmZmZmY7XG4kYmxhY2s6ICM1NTU7XG4kb2ZmLXdoaXRlOiAjZjhmOGY4O1xuJHdoaXRlOiAjZmZmO1xuJGRhcms6ICMwMDA7XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutMoreComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-aboutmore',
                templateUrl: './aboutmore.component.html',
                styleUrls: ['./aboutmore.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");





class AppComponent {
    triggerAnimation(outlet) {
        return outlet.activatedRouteData.animation || null;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 1, consts: [["outlet", "outlet"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-footer");
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@routerTransition", ctx.triggerAnimation(_r0));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('routerTransition', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ position: 'fixed', width: '100%' }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(100%)', opacity: 0 }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["sequence"])([
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["group"])([
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(0%)' }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.8s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(-100%)', opacity: 0 }))
                            ], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(100%)', opacity: 0 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.8s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(0%)', opacity: 1 }))
                            ], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true })
                        ])
                    ])
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('routerTransition', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter, :leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ position: 'fixed', width: '100%' }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(100%)', opacity: 0 }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["sequence"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["group"])([
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true }),
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(0%)' }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.8s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(-100%)', opacity: 0 }))
                                    ], { optional: true }),
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(100%)', opacity: 0 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.8s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(0%)', opacity: 1 }))
                                    ], { optional: true }),
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true })
                                ])
                            ])
                        ])
                    ])
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _services_tags_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/tags.service */ "./src/app/services/tags.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _profile_card_profile_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile-card/profile-card.component */ "./src/app/profile-card/profile-card.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/portfolio/portfolio.component.ts");
/* harmony import */ var _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dp-logo/dp-logo.component */ "./src/app/dp-logo/dp-logo.component.ts");
/* harmony import */ var _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navigator/navigator.component */ "./src/app/navigator/navigator.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _key_skill_btns_key_skill_btns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./key-skill-btns/key-skill-btns.component */ "./src/app/key-skill-btns/key-skill-btns.component.ts");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./project-card/project-card.component */ "./src/app/project-card/project-card.component.ts");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./projects/projects.component */ "./src/app/projects/projects.component.ts");
/* harmony import */ var _services_project_data_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/project-data.service */ "./src/app/services/project-data.service.ts");
/* harmony import */ var _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./project-details/project-details.component */ "./src/app/project-details/project-details.component.ts");
/* harmony import */ var _directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/esc-cancelation.directive */ "./src/app/directives/esc-cancelation.directive.ts");
/* harmony import */ var _ui_cross_icon_cross_icon_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ui/cross-icon/cross-icon.component */ "./src/app/ui/cross-icon/cross-icon.component.ts");
/* harmony import */ var _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ui/back-icon/back-icon.component */ "./src/app/ui/back-icon/back-icon.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _pipes_max_length_pipe__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pipes/max-length.pipe */ "./src/app/pipes/max-length.pipe.ts");
/* harmony import */ var _typing_typing_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./typing/typing.component */ "./src/app/typing/typing.component.ts");
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./landing-page/landing-page.component */ "./src/app/landing-page/landing-page.component.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _pipes_no_emoji_pipe__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pipes/no-emoji.pipe */ "./src/app/pipes/no-emoji.pipe.ts");
/* harmony import */ var _services_skills_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./services/skills.service */ "./src/app/services/skills.service.ts");
/* harmony import */ var _aboutmore_aboutmore_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./aboutmore/aboutmore.component */ "./src/app/aboutmore/aboutmore.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





//import { ServiceWorkerModule } from '@angular/service-worker';



























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _services_project_data_service__WEBPACK_IMPORTED_MODULE_14__["ProjectDataService"],
        _services_tags_service__WEBPACK_IMPORTED_MODULE_0__["TagsService"],
        _services_skills_service__WEBPACK_IMPORTED_MODULE_26__["SkillsService"],
        { provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["APP_BASE_HREF"], useValue: '!' }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _app_routing__WEBPACK_IMPORTED_MODULE_24__["appRouting"]
            // ServiceWorkerModule.register('/ngsw-worker.js', {
            //   enabled: environment.production
            // })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _profile_card_profile_card_component__WEBPACK_IMPORTED_MODULE_6__["ProfileCardComponent"],
        _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_7__["PortfolioComponent"],
        _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_8__["DpLogoComponent"],
        _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_9__["NavigatorComponent"],
        _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"],
        _key_skill_btns_key_skill_btns_component__WEBPACK_IMPORTED_MODULE_11__["KeySkillBtnsComponent"],
        _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_12__["ProjectCardComponent"],
        _projects_projects_component__WEBPACK_IMPORTED_MODULE_13__["ProjectsComponent"],
        _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_15__["ProjectDetailsComponent"],
        _directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_16__["EscCancelationDirective"],
        _ui_cross_icon_cross_icon_component__WEBPACK_IMPORTED_MODULE_17__["CrossIconComponent"],
        _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_18__["BackIconComponent"],
        _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__["ContactComponent"],
        _about_about_component__WEBPACK_IMPORTED_MODULE_20__["AboutComponent"],
        _pipes_max_length_pipe__WEBPACK_IMPORTED_MODULE_21__["MaxLengthPipe"],
        _typing_typing_component__WEBPACK_IMPORTED_MODULE_22__["TypingComponent"],
        _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_23__["LandingPageComponent"],
        _pipes_no_emoji_pipe__WEBPACK_IMPORTED_MODULE_25__["NoEmojiPipe"],
        _aboutmore_aboutmore_component__WEBPACK_IMPORTED_MODULE_27__["AboutMoreComponent"],
        _footer_footer_component__WEBPACK_IMPORTED_MODULE_28__["FooterComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_29__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _profile_card_profile_card_component__WEBPACK_IMPORTED_MODULE_6__["ProfileCardComponent"],
                    _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_7__["PortfolioComponent"],
                    _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_8__["DpLogoComponent"],
                    _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_9__["NavigatorComponent"],
                    _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"],
                    _key_skill_btns_key_skill_btns_component__WEBPACK_IMPORTED_MODULE_11__["KeySkillBtnsComponent"],
                    _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_12__["ProjectCardComponent"],
                    _projects_projects_component__WEBPACK_IMPORTED_MODULE_13__["ProjectsComponent"],
                    _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_15__["ProjectDetailsComponent"],
                    _directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_16__["EscCancelationDirective"],
                    _ui_cross_icon_cross_icon_component__WEBPACK_IMPORTED_MODULE_17__["CrossIconComponent"],
                    _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_18__["BackIconComponent"],
                    _contact_contact_component__WEBPACK_IMPORTED_MODULE_19__["ContactComponent"],
                    _about_about_component__WEBPACK_IMPORTED_MODULE_20__["AboutComponent"],
                    _pipes_max_length_pipe__WEBPACK_IMPORTED_MODULE_21__["MaxLengthPipe"],
                    _typing_typing_component__WEBPACK_IMPORTED_MODULE_22__["TypingComponent"],
                    _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_23__["LandingPageComponent"],
                    _pipes_no_emoji_pipe__WEBPACK_IMPORTED_MODULE_25__["NoEmojiPipe"],
                    _aboutmore_aboutmore_component__WEBPACK_IMPORTED_MODULE_27__["AboutMoreComponent"],
                    _footer_footer_component__WEBPACK_IMPORTED_MODULE_28__["FooterComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                    _app_routing__WEBPACK_IMPORTED_MODULE_24__["appRouting"]
                    // ServiceWorkerModule.register('/ngsw-worker.js', {
                    //   enabled: environment.production
                    // })
                ],
                providers: [
                    _services_project_data_service__WEBPACK_IMPORTED_MODULE_14__["ProjectDataService"],
                    _services_tags_service__WEBPACK_IMPORTED_MODULE_0__["TagsService"],
                    _services_skills_service__WEBPACK_IMPORTED_MODULE_26__["SkillsService"],
                    { provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["APP_BASE_HREF"], useValue: '!' }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: appRouting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRouting", function() { return appRouting; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _profile_card_profile_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile-card/profile-card.component */ "./src/app/profile-card/profile-card.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./portfolio/portfolio.component */ "./src/app/portfolio/portfolio.component.ts");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _aboutmore_aboutmore_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./aboutmore/aboutmore.component */ "./src/app/aboutmore/aboutmore.component.ts");







const APP_ROUTES = [
    {
        path: '',
        component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_2__["ProfileComponent"],
        pathMatch: 'full',
        data: { animation: 'landing-page' }
    },
    {
        path: 'profile-card',
        component: _profile_card_profile_card_component__WEBPACK_IMPORTED_MODULE_1__["ProfileCardComponent"],
        data: { animation: 'profile-card' }
    },
    {
        path: 'portfolio',
        component: _portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_3__["PortfolioComponent"],
        data: { animation: 'portfolio' }
    },
    {
        path: 'about',
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"],
        data: { animation: 'about' }
    },
    {
        path: 'contact',
        redirectTo: '/profiles'
    },
    {
        path: 'profiles',
        component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_5__["ContactComponent"],
        data: { animation: 'contact' }
    },
    {
        path: 'aboutmore',
        component: _aboutmore_aboutmore_component__WEBPACK_IMPORTED_MODULE_6__["AboutMoreComponent"],
        data: { animation: 'aboutmore' }
    },
    { path: '**', redirectTo: '/' }
];
const appRouting = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(APP_ROUTES, {
    useHash: true,
    initialNavigation: 'enabled'
});


/***/ }),

/***/ "./src/app/contact/contact.component.ts":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/back-icon/back-icon.component */ "./src/app/ui/back-icon/back-icon.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function ContactComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const profileLinks_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", profileLinks_r2.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", profileLinks_r2.name)("src", profileLinks_r2.iconUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", profileLinks_r2.name);
} }
function ContactComponent_a_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const workProfile_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", workProfile_r3.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", workProfile_r3.name)("src", workProfile_r3.iconUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", workProfile_r3.name);
} }
class ContactComponent {
    constructor(router) {
        this.router = router;
        this.contactProfile = {
            profile: [
                {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/suryaraj.me/',
                    iconUrl: './assets/icons/instagram.svg'
                },
                {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/suryakantamangaraj/',
                    iconUrl: './assets/icons/linkedin.svg'
                },
                {
                    name: 'Facebook',
                    url: 'https://www.facebook.com/suryaraj.me',
                    iconUrl: './assets/icons/facebook.svg'
                },
                {
                    name: 'Twitter',
                    url: 'https://twitter.com/_suryaraj_',
                    iconUrl: './assets/icons/twitter.svg'
                }
            ],
            work: [
                {
                    name: 'Tumblr',
                    url: 'https://suryaraj.tumblr.com/',
                    iconUrl: './assets/icons/tumblr.svg'
                },
                {
                    name: 'Medium',
                    url: 'https://surya-raj.medium.com/',
                    iconUrl: './assets/icons/medium.svg'
                },
                {
                    name: 'Behance',
                    url: 'https://www.behance.net/surya_raj',
                    iconUrl: './assets/icons/behance.svg'
                },
                {
                    name: 'Goodreads',
                    url: 'https://www.goodreads.com/user/show/98923939-surya-raj',
                    iconUrl: './assets/icons/goodreads.svg'
                }
            ]
        };
        this.email = {
            name: 'Email',
            url: 'mailto:surya.socialnetworking@gmail.com',
            iconUrl: './assets/icons/email.svg'
        };
        this.github = {
            name: 'GitHub',
            url: 'https://github.com/suryakantamangaraj',
            iconUrl: './assets/icons/github.svg'
        };
    }
    ngOnInit() { }
    onBackClick() {
        this.router.navigateByUrl('/');
    }
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) { return new (t || ContactComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
ContactComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContactComponent, selectors: [["app-contact"]], decls: 23, vars: 12, consts: [[1, "back-icon", 3, "click"], [1, "root"], [1, "page-header"], [1, "container"], [1, "part", "part1"], [1, "section", "icons", "flex-1"], ["target", "_blank", "class", "img icon", 3, "href", 4, "ngFor", "ngForOf"], [1, "section", "min-section"], ["target", "_blank", 1, "img", "icon", 3, "href"], [3, "title", "src", "alt"], [1, "part", "part2"], ["target", "_top", 1, "img", "icon", 3, "href"], ["class", "img icon", "target", "_blank", 3, "href", 4, "ngFor", "ngForOf"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_div_click_0_listener() { return ctx.onBackClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-back-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "CONTACT & PROFILES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ContactComponent_a_9_Template, 2, 4, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, ContactComponent_a_22_Template, 2, 4, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contactProfile.profile);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx.github.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx.github.name)("src", ctx.github.iconUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", ctx.github.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.github.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx.email.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", ctx.email.name)("src", ctx.email.iconUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", ctx.email.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.email.url.replace("mailto:", ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contactProfile.work);
    } }, directives: [_ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_2__["BackIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #f2f2f2;\n}\n\n.root[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  min-width: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.root[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:nth-child(1) {\n  flex: 6;\n  display: flex;\n  align-items: center;\n}\n\n.root[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:nth-child(2) {\n  flex: 8;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  color: #f8f8f8;\n  position: relative;\n  font-size: 3rem;\n  letter-spacing: 1px;\n  word-spacing: 1.5px;\n  margin: 2rem 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  font-family: \"Cormorant Garamond\", serif;\n}\n\n.page-header[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 100%;\n  height: 2px;\n  top: 100%;\n  left: 0;\n  background: #f8f8f8;\n}\n\n.icon[_ngcontent-%COMP%] {\n  height: 5rem;\n  width: 5rem;\n  cursor: pointer;\n  transition: 0.3s all ease-in-out;\n  animation: fade 1.4s ease-in-out 0.4s 1 both;\n}\n\n.icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n\n@media (max-width: 690px) {\n  .icon[_ngcontent-%COMP%] {\n    height: 3rem;\n    width: 3rem;\n  }\n}\n\n@media (max-width: 350px) {\n  .icon[_ngcontent-%COMP%] {\n    height: 2rem;\n    width: 2rem;\n  }\n}\n\n.img[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.container[_ngcontent-%COMP%] {\n  width: 95%;\n  max-width: 75rem;\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: flex-start;\n  flex-direction: column;\n}\n\n.icons[_ngcontent-%COMP%] {\n  padding-right: 2rem;\n  padding-left: 2rem;\n}\n\n.section[_ngcontent-%COMP%] {\n  background: #000;\n  display: flex;\n  margin: 2px;\n  justify-content: space-around;\n  align-items: center;\n  padding-top: 2.4rem;\n  padding-bottom: 2.4rem;\n}\n\n.section.min-section[_ngcontent-%COMP%] {\n  width: 35%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  color: #f8f8f8;\n  font-size: 1.6rem;\n}\n\n@media (max-width: 690px) {\n  .section.min-section[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n}\n\n@media (max-width: 350px) {\n  .section.min-section[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n\n.section.min-section[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0px 1rem;\n  width: 90%;\n  text-align: center;\n  word-break: break-word;\n  padding-top: 0.8rem;\n  margin-bottom: -0.8rem;\n}\n\n.part[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.flex-1[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n@keyframes fade {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fdmFyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxxQkFBQTtFQUNBLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBQUY7O0FBQ0U7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBQ0U7RUFDRSxPQUFBO0FBQ0o7O0FBR0E7RUFDRSxjQ2pCVTtFRGtCVixrQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0tBQUEsc0JBQUE7VUFBQSxpQkFBQTtFQUNBLHdDQUFBO0FBQUY7O0FBQ0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxtQkNqQ1E7QURrQ1o7O0FBR0E7RUFFRSxZQURtQjtFQUVuQixXQUZtQjtFQUduQixlQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0Q0FBQTtBQURGOztBQUVFO0VBQ0UscUJBQUE7QUFBSjs7QUFFRTtFQVZGO0lBWUksWUFEbUI7SUFFbkIsV0FGbUI7RUFFckI7QUFDRjs7QUFDRTtFQWZGO0lBaUJJLFlBRG1CO0lBRW5CLFdBRm1CO0VBR3JCO0FBQ0Y7O0FBR0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUFKOztBQUlBO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLE9BQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0Esc0JBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUFERjs7QUFJQTtFQUNFLGdCQ3ZGTztFRHdGUCxhQUFBO0VBQ0EsV0FBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBREY7O0FBSUU7RUFDRSxVQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGNDakdRO0VEa0dSLGlCQUFBO0FBRko7O0FBR0k7RUFSRjtJQVNJLGlCQUFBO0VBQUo7QUFDRjs7QUFDSTtFQVhGO0lBWUksaUJBQUE7RUFFSjtBQUNGOztBQURJO0VBQ0UsZ0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFHTjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxPQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFVBQUE7RUFDRjtFQUNBO0lBQ0UsVUFBQTtFQUNGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi92YXInO1xuYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6ICNmMmYyZjI7XG59XG5cbi5yb290IHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIG1pbi13aWR0aDogMTAwdnc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAmPjpudGgtY2hpbGQoMSkge1xuICAgIGZsZXg6IDY7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG4gICY+Om50aC1jaGlsZCgyKSB7XG4gICAgZmxleDogODtcbiAgfVxufVxuXG4ucGFnZS1oZWFkZXIge1xuICBjb2xvcjogJG9mZi13aGl0ZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDNyZW07XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHdvcmQtc3BhY2luZzogMS41cHg7XG4gIG1hcmdpbjogMnJlbSAwO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgZm9udC1mYW1pbHk6ICdDb3Jtb3JhbnQgR2FyYW1vbmQnLCBzZXJpZjsgLy8gZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgJjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICB0b3A6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICBiYWNrZ3JvdW5kOiAkb2ZmLXdoaXRlO1xuICB9XG59XG5cbi5pY29uIHtcbiAgJG1heC13aWR0aC1oZWlnaHQ6IDVyZW07XG4gIGhlaWdodDogJG1heC13aWR0aC1oZWlnaHQ7XG4gIHdpZHRoOiAkbWF4LXdpZHRoLWhlaWdodDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiAwLjNzIGFsbCBlYXNlLWluLW91dDtcbiAgYW5pbWF0aW9uOiBmYWRlIDEuNHMgZWFzZS1pbi1vdXQgMC40cyAxIGJvdGggO1xuICAmOmhvdmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDY5MHB4KSB7XG4gICAgJG1heC13aWR0aC1oZWlnaHQ6IDNyZW07XG4gICAgaGVpZ2h0OiAkbWF4LXdpZHRoLWhlaWdodDtcbiAgICB3aWR0aDogJG1heC13aWR0aC1oZWlnaHQ7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XG4gICAgJG1heC13aWR0aC1oZWlnaHQ6IDJyZW07XG4gICAgaGVpZ2h0OiAkbWF4LXdpZHRoLWhlaWdodDtcbiAgICB3aWR0aDogJG1heC13aWR0aC1oZWlnaHQ7XG4gIH1cbn1cblxuLmltZyB7XG4gICY+aW1nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIHdpZHRoOiA5NSU7XG4gIG1heC13aWR0aDogNzVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDE7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmljb25zIHtcbiAgcGFkZGluZy1yaWdodDogMnJlbTtcbiAgcGFkZGluZy1sZWZ0OiAycmVtO1xufVxuXG4uc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6ICRjb2xvcjI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogMnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZCA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiAyLjRyZW07XG4gIHBhZGRpbmctYm90dG9tOiAyLjRyZW07XG5cblxuICAmLm1pbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogMzUlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGNvbG9yOiAkb2ZmLXdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2OTBweCkge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgfVxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzNTBweCkge1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgfVxuICAgICY+cCB7XG4gICAgICBtYXJnaW46IDBweCAxcmVtO1xuICAgICAgd2lkdGg6IDkwJTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgICBwYWRkaW5nLXRvcDogMC44cmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogLTAuOHJlbTtcbiAgICB9XG4gIH1cbn1cblxuLnBhcnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmZsZXgtMSB7XG4gIGZsZXg6IDE7XG59XG5cbkBrZXlmcmFtZXMgZmFkZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiIsIiRiZy1jb2xvcjogIzQwNWNhMTtcbiRjb2xvcjE6ICM4YjAwMDA7XG4kY29sb3IyOiAjMDAwO1xuJGNvbG9yMzogIzgwMDAwMDtcbiRjb2xvcjQ6ICM4YjAwMDA7XG4kdGV4dC1jb2xvcjogI2ZmZmZmZjtcbiRibGFjazogIzU1NTtcbiRvZmYtd2hpdGU6ICNmOGY4Zjg7XG4kd2hpdGU6ICNmZmY7XG4kZGFyazogIzAwMDtcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContactComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-contact',
                templateUrl: './contact.component.html',
                styleUrls: ['./contact.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/directives/esc-cancelation.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/esc-cancelation.directive.ts ***!
  \*********************************************************/
/*! exports provided: EscCancelationDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscCancelationDirective", function() { return EscCancelationDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class EscCancelationDirective {
    constructor() {
        this.appEscCancelation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    onKeydownHandler(event) {
        if (event.key === 'Escape')
            this.appEscCancelation.emit({
                msg: 'Escape Btn Clicked',
                event
            });
    }
}
EscCancelationDirective.ɵfac = function EscCancelationDirective_Factory(t) { return new (t || EscCancelationDirective)(); };
EscCancelationDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: EscCancelationDirective, selectors: [["", "appEscCancelation", ""]], hostBindings: function EscCancelationDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function EscCancelationDirective_keydown_HostBindingHandler($event) { return ctx.onKeydownHandler($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    } }, outputs: { appEscCancelation: "appEscCancelation" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EscCancelationDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appEscCancelation]'
            }]
    }], function () { return []; }, { appEscCancelation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['appEscCancelation']
        }], onKeydownHandler: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:keydown', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/dp-logo/dp-logo.component.ts":
/*!**********************************************!*\
  !*** ./src/app/dp-logo/dp-logo.component.ts ***!
  \**********************************************/
/*! exports provided: DpLogoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DpLogoComponent", function() { return DpLogoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



class DpLogoComponent {
    constructor() { }
    ngOnInit() {
        this.logoStyles = {
            height: this.height,
            width: this.width
        };
        this.imgStyle = {
            borderWidth: this.borderWidth
        };
        // console.log(this.height);
        // console.log(this.width);
        // console.log(this.borderWidth);
    }
    ngOnChanges(changes) {
        this.ngOnInit();
    }
}
DpLogoComponent.ɵfac = function DpLogoComponent_Factory(t) { return new (t || DpLogoComponent)(); };
DpLogoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DpLogoComponent, selectors: [["app-dp-logo"]], inputs: { height: "height", width: "width", borderWidth: "borderWidth" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 2, vars: 2, consts: [[1, "profile-logo", 3, "ngStyle"], ["src", "assets/img/surya1.jpg", "alt", "my pic", 3, "ngStyle"]], template: function DpLogoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.logoStyles);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.imgStyle);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: [".profile-logo[_ngcontent-%COMP%] {\n  height: 14rem;\n  width: 14rem;\n  display: inline-block;\n  position: relative;\n  z-index: 5;\n  border-radius: 50%;\n  perspective: 1500px;\n  transition: all 0.2s ease-in-out;\n  animation: dropin 1s ease-in-out 0.4s 1 normal both;\n}\n.profile-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: relative;\n  border: 0.8rem solid #8b0000;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  transition: all 0.5s ease-in-out;\n  perspective: 1500px;\n}\n.profile-logo[_ngcontent-%COMP%]::after {\n  content: \"Surya Raj\";\n  display: flex;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  color: #fff;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  background-color: #8b0000;\n  border: 0.8rem solid #800000;\n  top: 0px;\n  left: 0px;\n  z-index: 10;\n  font-size: 0.8em;\n  transition: all 0.5s ease-in-out;\n  transform: rotateY(180deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  perspective: 1500px;\n}\n.profile-logo[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: rotateY(180deg);\n}\n.profile-logo[_ngcontent-%COMP%]:hover::after {\n  transform: rotateY(0deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZHAtbG9nby9kcC1sb2dvLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fdmFyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUVBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbURBQUE7QUFGRjtBQUdFO0VBQ0Usa0JBQUE7RUFDQSw0QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtBQURKO0FBR0U7RUFDRSxvQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQ2hDSztFRGlDTCw0QkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0NBQUE7RUFDQSwwQkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxtQkFBQTtBQURKO0FBSUk7RUFDRSwwQkFBQTtBQUZOO0FBS0U7RUFDRSx3QkFBQTtBQUhKIiwiZmlsZSI6InNyYy9hcHAvZHAtbG9nby9kcC1sb2dvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vdmFyJztcblxuLnByb2ZpbGUtbG9nbyB7XG4gIGhlaWdodDogMTRyZW07XG4gIHdpZHRoOiAxNHJlbTtcbiAgLy8gbWFyZ2luLXRvcDogNnJlbTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgcGVyc3BlY3RpdmU6IDE1MDBweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIGFuaW1hdGlvbjogZHJvcGluIDFzIGVhc2UtaW4tb3V0IDAuNHMgMSBub3JtYWwgYm90aDtcbiAgaW1nIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyOiAwLjhyZW0gc29saWQgJGNvbG9yMTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dDtcbiAgICBwZXJzcGVjdGl2ZTogMTUwMHB4O1xuICB9XG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnU3VyeWEgUmFqJztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMTtcbiAgICBib3JkZXI6IDAuOHJlbSBzb2xpZCAkY29sb3IzO1xuICAgIHRvcDogMHB4O1xuICAgIGxlZnQ6IDBweDtcbiAgICB6LWluZGV4OiAxMDtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBwZXJzcGVjdGl2ZTogMTUwMHB4O1xuICB9XG4gICY6aG92ZXIge1xuICAgIGltZyB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcbiAgICB9XG4gIH1cbiAgJjpob3Zlcjo6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcbiAgfVxufVxuIiwiJGJnLWNvbG9yOiAjNDA1Y2ExO1xuJGNvbG9yMTogIzhiMDAwMDtcbiRjb2xvcjI6ICMwMDA7XG4kY29sb3IzOiAjODAwMDAwO1xuJGNvbG9yNDogIzhiMDAwMDtcbiR0ZXh0LWNvbG9yOiAjZmZmZmZmO1xuJGJsYWNrOiAjNTU1O1xuJG9mZi13aGl0ZTogI2Y4ZjhmODtcbiR3aGl0ZTogI2ZmZjtcbiRkYXJrOiAjMDAwO1xuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DpLogoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dp-logo',
                templateUrl: './dp-logo.component.html',
                styleUrls: ['./dp-logo.component.scss']
            }]
    }], function () { return []; }, { height: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['height']
        }], width: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['width']
        }], borderWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['borderWidth']
        }] }); })();


/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 3, vars: 0, consts: [[1, "footer"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u00A9 2020 Surya Raj \u2022 Made with \uD83E\uDD0D by Surya");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".footer[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  font-size: 1.4rem;\n  background-color: #800000;\n  color: white;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EseUJDTE87RURNUCxZQUFBO0VBQ0Esa0JBQUE7QUFERiIsImZpbGUiOiJzcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi92YXInO1xuXG4uZm9vdGVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMztcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iLCIkYmctY29sb3I6ICM0MDVjYTE7XG4kY29sb3IxOiAjOGIwMDAwO1xuJGNvbG9yMjogIzAwMDtcbiRjb2xvcjM6ICM4MDAwMDA7XG4kY29sb3I0OiAjOGIwMDAwO1xuJHRleHQtY29sb3I6ICNmZmZmZmY7XG4kYmxhY2s6ICM1NTU7XG4kb2ZmLXdoaXRlOiAjZjhmOGY4O1xuJHdoaXRlOiAjZmZmO1xuJGRhcms6ICMwMDA7XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/key-skill-btns/key-skill-btns.component.ts":
/*!************************************************************!*\
  !*** ./src/app/key-skill-btns/key-skill-btns.component.ts ***!
  \************************************************************/
/*! exports provided: KeySkillBtnsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeySkillBtnsComponent", function() { return KeySkillBtnsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_tags_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/tags.service */ "./src/app/services/tags.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




const _c0 = function (a0) { return { "key-skill--disabled": a0 }; };
function KeySkillBtnsComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function KeySkillBtnsComponent_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const keySkill_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.toogleSkillSelection(keySkill_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const keySkill_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.disableIfOneBtn(keySkill_r1))("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, !keySkill_r1.isSelected));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", keySkill_r1.displayName, " ");
} }
class KeySkillBtnsComponent {
    constructor(tagsService) {
        this.tagsService = tagsService;
        this.keySkills = tagsService.tags;
    }
    ngOnInit() { }
    toogleSkillSelection(tag) {
        this.tagsService.toogleTagSelection(tag.displayName);
    }
    disableIfOneBtn(keySkill) {
        const targetKeySkills = this.keySkills.filter(e => e.isSelected);
        return (targetKeySkills.length === 1 &&
            targetKeySkills[0].displayName === keySkill.displayName);
    }
}
KeySkillBtnsComponent.ɵfac = function KeySkillBtnsComponent_Factory(t) { return new (t || KeySkillBtnsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_tags_service__WEBPACK_IMPORTED_MODULE_1__["TagsService"])); };
KeySkillBtnsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: KeySkillBtnsComponent, selectors: [["app-key-skill-btns"]], decls: 2, vars: 1, consts: [[1, "key-skills"], ["class", "key-skill", 3, "disabled", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "key-skill", 3, "disabled", "ngClass", "click"]], template: function KeySkillBtnsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, KeySkillBtnsComponent_button_1_Template, 2, 5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.keySkills);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], styles: [".key-skills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: 1rem auto;\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill[_ngcontent-%COMP%] {\n  z-index: 99;\n  position: relative;\n  font-size: 1.6rem;\n  margin: 0.6rem;\n  padding: 0.4rem 2rem;\n  border: 2px solid #800000;\n  border-radius: 50rem;\n  cursor: pointer;\n  color: #fff;\n  line-height: 1.5;\n  background-color: #800000;\n  transition: all 0.3s ease-in-out;\n  outline: none;\n  box-shadow: 0.4rem 0.5rem 0.9rem rgba(0, 0, 0, 0.25);\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill[_ngcontent-%COMP%]:disabled {\n  background-color: #b30000;\n  border: 2px solid #b30000;\n  box-shadow: none;\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill[_ngcontent-%COMP%]:hover:disabled {\n  margin: 0.6rem;\n  padding: 0.4rem 2rem;\n  cursor: not-allowed;\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill[_ngcontent-%COMP%]:hover {\n  padding: 0.4rem 3.2rem;\n  margin: 0.6rem 2rem;\n}\n@media screen and (max-width: 640px) {\n  .key-skills[_ngcontent-%COMP%]   .key-skill[_ngcontent-%COMP%]:hover {\n    margin: 0.6rem;\n    padding: 0.4rem 2rem;\n  }\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill.key-skill--disabled[_ngcontent-%COMP%] {\n  border: 2px solid #800000;\n  background-color: transparent;\n  overflow: hidden;\n  transition: all 0.3s ease-in-out;\n}\n.key-skills[_ngcontent-%COMP%]   .key-skill.key-skill--disabled[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 2px;\n  background-color: #800000;\n  top: 50%;\n  left: 0;\n  transform: rotateZ(-14deg);\n  transition: all 0.3s ease-in-out;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva2V5LXNraWxsLWJ0bnMva2V5LXNraWxsLWJ0bnMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL192YXIuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtBQURGO0FBTUU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBUGlCO0VBUWpCLG9CQVBrQjtFQVFsQix5QkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQ25CSztFRG9CTCxnQ0FBQTtFQUNBLGFBQUE7RUFDQSxvREFBQTtBQUpKO0FBTUk7RUFDRSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFKTjtBQU9JO0VBQ0UsY0ExQmU7RUEyQmYsb0JBMUJnQjtFQTJCaEIsbUJBQUE7QUFMTjtBQVNJO0VBQ0Usc0JBQUE7RUFDQSxtQkFBQTtBQVBOO0FBU007RUFKRjtJQUtJLGNBckNhO0lBc0NiLG9CQXJDYztFQStCcEI7QUFDRjtBQVNJO0VBQ0UseUJBQUE7RUFDQSw2QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0NBQUE7QUFQTjtBQVVJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EseUJDNURHO0VENkRILFFBQUE7RUFDQSxPQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQ0FBQTtBQVJOIiwiZmlsZSI6InNyYy9hcHAva2V5LXNraWxsLWJ0bnMva2V5LXNraWxsLWJ0bnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi92YXInO1xuXG4ua2V5LXNraWxscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogMXJlbSBhdXRvO1xuXG4gICRrZXlfc2tpbGxfbWFyZ2luOiAwLjZyZW07XG4gICRrZXlfc2tpbGxfcGFkZGluZzogMC40cmVtIDJyZW07XG5cbiAgLmtleS1za2lsbCB7XG4gICAgei1pbmRleDogOTk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIG1hcmdpbjogJGtleV9za2lsbF9tYXJnaW47XG4gICAgcGFkZGluZzogJGtleV9za2lsbF9wYWRkaW5nO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICRjb2xvcjM7XG4gICAgYm9yZGVyLXJhZGl1czogNTByZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMztcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJveC1zaGFkb3c6IDAuNHJlbSAwLjVyZW0gMC45cmVtIHJnYmEoMCwgMCwgMCwgMC4yNSk7XG5cbiAgICAmOmRpc2FibGVkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0ZW4oJGNvbG9yMywgJGFtb3VudDogMTApO1xuICAgICAgYm9yZGVyOiAycHggc29saWQgbGlnaHRlbigkY29sb3IzLCAkYW1vdW50OiAxMCk7XG4gICAgICBib3gtc2hhZG93OiBub25lO1xuICAgIH1cblxuICAgICY6aG92ZXI6ZGlzYWJsZWQge1xuICAgICAgbWFyZ2luOiAka2V5X3NraWxsX21hcmdpbjtcbiAgICAgIHBhZGRpbmc6ICRrZXlfc2tpbGxfcGFkZGluZztcbiAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuXG4gICAgLy8gJC5rZXktc2tpbGxcbiAgICAmOmhvdmVyIHtcbiAgICAgIHBhZGRpbmc6IDAuNHJlbSAzLjJyZW07XG4gICAgICBtYXJnaW46IDAuNnJlbSAycmVtO1xuXG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xuICAgICAgICBtYXJnaW46ICRrZXlfc2tpbGxfbWFyZ2luO1xuICAgICAgICBwYWRkaW5nOiAka2V5X3NraWxsX3BhZGRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5rZXktc2tpbGwtLWRpc2FibGVkIHtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkICRjb2xvcjM7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAmLmtleS1za2lsbC0tZGlzYWJsZWQ6YWZ0ZXIge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAycHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IzO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKC0xNGRlZyk7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIC8vIGFuaW1hdGlvbjogc2xpZGVJbiAwLjZzO1xuICAgIH1cbiAgfVxufVxuXG4vLyBAa2V5ZnJhbWVzIHNsaWRlSW4ge1xuLy8gICAwJSB7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSk7XG4vLyAgICAgb3BhY2l0eTogMDtcbi8vICAgfVxuLy8gICAxMDAlIHtcbi8vICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSk7XG4vLyAgICAgb3BhY2l0eTogMTtcbi8vICAgfVxuLy8gfVxuXG4vLyBAa2V5ZnJhbWVzIHNsaWRlT3V0e1xuLy8gICAwJSB7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUpO1xuLy8gICAgIG9wYWNpdHk6IDE7XG4vLyAgIH1cbi8vICAgMTAwJSB7XG4vLyAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNTAlKTtcbi8vICAgICBvcGFjaXR5OiAwO1xuLy8gICB9XG4vLyB9XG4iLCIkYmctY29sb3I6ICM0MDVjYTE7XG4kY29sb3IxOiAjOGIwMDAwO1xuJGNvbG9yMjogIzAwMDtcbiRjb2xvcjM6ICM4MDAwMDA7XG4kY29sb3I0OiAjOGIwMDAwO1xuJHRleHQtY29sb3I6ICNmZmZmZmY7XG4kYmxhY2s6ICM1NTU7XG4kb2ZmLXdoaXRlOiAjZjhmOGY4O1xuJHdoaXRlOiAjZmZmO1xuJGRhcms6ICMwMDA7XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](KeySkillBtnsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-key-skill-btns',
                templateUrl: './key-skill-btns.component.html',
                styleUrls: ['./key-skill-btns.component.scss']
            }]
    }], function () { return [{ type: _services_tags_service__WEBPACK_IMPORTED_MODULE_1__["TagsService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/landing-page/landing-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.ts ***!
  \********************************************************/
/*! exports provided: LandingPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageComponent", function() { return LandingPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dp-logo/dp-logo.component */ "./src/app/dp-logo/dp-logo.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





const _c0 = function () { return ["/portfolio"]; };
const _c1 = function () { return ["/about"]; };
const _c2 = function () { return ["/profiles"]; };
const _c3 = function (a0) { return { "tada-animation": a0 }; };
class LandingPageComponent {
    constructor() {
        this.ExploreMe = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.startTadaAnimation = false;
    }
    ngOnInit() {
        setInterval(() => {
            this.startTadaAnimation = !this.startTadaAnimation;
        }, 3000);
    }
    onExploreMeClick() {
        this.ExploreMe.emit();
    }
}
LandingPageComponent.ɵfac = function LandingPageComponent_Factory(t) { return new (t || LandingPageComponent)(); };
LandingPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LandingPageComponent, selectors: [["app-landing-page"]], outputs: { ExploreMe: "ExploreMe" }, decls: 28, vars: 9, consts: [[1, "overlay"], [1, "root-container"], [1, "navbar"], [1, "nav-items"], [1, "nav-item", 3, "routerLink"], ["href", "https://blog.suryaraj.me", 1, "nav-item"], [1, "container"], [1, "dp-logo"], [1, "short-bio"], [1, "quote"], [1, "name"], [1, "strip"], [3, "ngClass", "click", "mouseover"], [1, "special-btn"], [1, "stick"], [1, "stick-design"]], template: function LandingPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Portfolio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Profiles");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Blog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "app-dp-logo", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h4", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Designer | Developer | Mentor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "q", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Solving problems through Logic and Code.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " SURYA RAJ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LandingPageComponent_Template_span_click_22_listener() { return ctx.onExploreMeClick(); })("mouseover", function LandingPageComponent_Template_span_mouseover_22_listener() { return ctx.startTadaAnimation = false; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Explore Me ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](7, _c3, ctx.startTadaAnimation));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_2__["DpLogoComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"]], styles: ["@charset \"UTF-8\";\n.root-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw;\n}\n.overlay[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n  z-index: -1;\n  display: block;\n  background: #000;\n  position: fixed;\n  right: 0;\n  top: 0;\n  pointer-events: none;\n  -webkit-clip-path: ellipse(50vw 40vh at 50% 50%);\n          clip-path: ellipse(50vw 40vh at 50% 50%);\n  transform: scale(2) translate(27vw, -18vh) rotate(335deg);\n  animation: 1s ease-in-out 0.2s both leftToRight;\n}\n.dp-logo[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  animation: 1s ease-in-out 0.2s both fadeIn;\n}\n.navbar[_ngcontent-%COMP%] {\n  width: 100%;\n  color: #f8f8f8;\n  font-size: 2rem;\n  padding: 1.6rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.nav-items[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.2rem 0;\n  margin: 0.6rem 1rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  border-bottom: 0.3rem solid #8b0000;\n  color: #f8f8f8;\n  text-decoration: none;\n}\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  font-size: 1.6rem;\n  color: #f8f8f8;\n  margin-top: 5%;\n}\n.short-bio[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  padding: 1.6rem;\n  font-weight: normal;\n  animation: 1s ease-in-out 0.2s both fadeIn;\n}\n.quote[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  font-size: 1.8rem;\n  padding: 1rem;\n  padding-top: 0rem;\n  animation: 1s ease-in-out 0.4s both fadeIn;\n}\n.name[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  font-size: 2.4rem;\n  font-weight: bold;\n  line-height: 1.6;\n  padding-top: 0.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4rem;\n  word-spacing: 0.2rem;\n  text-align: center;\n  margin-bottom: -2.5rem;\n  animation: 1s ease-in-out 0.6s both fadeIn;\n}\n.name[_ngcontent-%COMP%]:hover   .strip[_ngcontent-%COMP%]::after {\n  left: -1rem;\n}\n.name[_ngcontent-%COMP%]:hover   .strip[_ngcontent-%COMP%]::before {\n  left: 1rem;\n}\n.strip[_ngcontent-%COMP%] {\n  display: inline-block;\n  position: relative;\n  width: 28rem;\n  margin: auto;\n  margin-bottom: 2rem;\n  animation: 1s ease-in-out 0.8s both fadeIn;\n}\n.strip[_ngcontent-%COMP%]::before {\n  transition: 0.3s all ease-in-out;\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  height: 2px;\n  background-color: #8b0000;\n  margin: 2px 0;\n  width: 100%;\n  margin: auto;\n  top: 0;\n  left: -1rem;\n}\n.strip[_ngcontent-%COMP%]::after {\n  transition: 0.3s all ease-in-out;\n  position: absolute;\n  display: inline-block;\n  content: \"\";\n  height: 2px;\n  background-color: #800000;\n  margin: 2px 0;\n  width: 100%;\n  margin: auto;\n  top: 4px;\n  left: 1rem;\n}\n.special-btn[_ngcontent-%COMP%] {\n  min-width: 15rem;\n  line-height: 2.2;\n  font-size: 1.4rem;\n  padding: 0.5rem;\n  margin-top: 2rem;\n  background-color: #8b0000;\n  color: #fff;\n  border: none;\n  outline: none;\n  border-radius: 100rem;\n  cursor: pointer;\n  transition: all 0.3s ease-in-out;\n  animation: fadeIn 1s ease-in-out 1s both;\n  box-shadow: 7px 5px 8px 0 rgba(0, 0, 0, 0.31);\n  position: relative;\n}\n.special-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: relative;\n  transform: translateX(0.7rem);\n  display: inline-block;\n  transition: all 0.3s ease-in-out;\n}\n.special-btn[_ngcontent-%COMP%]:hover {\n  background-color: #800000;\n  animation-play-state: paused;\n}\n.special-btn[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(0.2rem);\n  opacity: 1;\n}\n.special-btn[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  transform: translateX(-0.2rem);\n}\n.special-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.8);\n  box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.31);\n}\n.special-btn[_ngcontent-%COMP%]::after {\n  content: \"\u00BB\";\n  position: relative;\n  opacity: 0;\n  vertical-align: sub;\n  font-size: 2.7rem;\n  line-height: 0;\n  transform: translateX(25px);\n  display: inline-block;\n  transition: all 0.3s ease-in-out;\n}\n.stick[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: -1rem;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  z-index: -1;\n  animation: 1s ease-in-out 1s both fadeIn;\n}\n.stick[_ngcontent-%COMP%]::after {\n  content: \"\";\n  height: 200vh;\n  width: 1.6rem;\n  display: inline-block;\n  position: absolute;\n  background-color: #8b0000;\n  left: 50%;\n  top: 0;\n  z-index: 5;\n  transform: translate(-50%);\n  box-shadow: 7px 5px 8px 0 rgba(0, 0, 0, 0.31);\n}\n.stick[_ngcontent-%COMP%]   .stick-design[_ngcontent-%COMP%] {\n  background-color: #8b0000;\n  padding: 1.4rem;\n  position: absolute;\n  left: 50%;\n  min-width: 8.5rem;\n  top: 3.5rem;\n  border-radius: 100rem;\n  transform: translate(-50%);\n  z-index: 6;\n  box-shadow: 13px 0px 20px 0 rgba(0, 0, 0, 0.2);\n  transition: 1s all ease-in-out;\n}\n.stick[_ngcontent-%COMP%]   .stick-design[_ngcontent-%COMP%]::after {\n  content: \"\";\n  height: 0.8rem;\n  width: 0.8rem;\n  position: absolute;\n  border-radius: 50%;\n  background-color: #000;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 2rem 0px 0px #000, -2rem 0px 0px #000;\n}\n.tada-animation[_ngcontent-%COMP%] {\n  animation: tada 1s ease-in-out 0s 2 normal both;\n}\n@keyframes leftToRight {\n  0% {\n    display: relative;\n    opacity: 0.1;\n    left: -20%;\n  }\n  100% {\n    display: relative;\n    opacity: 1;\n    left: 0%;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes tada {\n  0% {\n    transform: scale(1) rotate(0deg);\n  }\n  10% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  20% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  30% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  40% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  50% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  60% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  70% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  80% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  90% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  100% {\n    transform: scale(1) rotate(0deg);\n  }\n}\n@keyframes stripAnimation {\n  0% {\n    transform: translateX(-10px) rotateZ(0deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px) rotateZ(-16deg);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGFuZGluZy1wYWdlL2xhbmRpbmctcGFnZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUVoQjtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBQUY7QUFHQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQ2JPO0VEY1AsZUFBQTtFQUNBLFFBQUE7RUFDQSxNQUFBO0VBQ0Esb0JBQUE7RUFDQSxnREFBQTtVQUFBLHdDQUFBO0VBQ0EseURBQUE7RUFDQSwrQ0FBQTtBQUFGO0FBR0E7RUFDRSxlQUFBO0VBQ0EsMENBQUE7QUFBRjtBQUdBO0VBQ0UsV0FBQTtFQUNBLGNDekJVO0VEMEJWLGVBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFBRjtBQUlFO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtVQUFBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1DQUFBO0VBQ0EsY0N6Q1E7RUQwQ1IscUJBQUE7QUFESjtBQUtBO0VBQ0UsYUFBQTtFQUNBLE9BQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQ3REVTtFRHVEVixjQUFBO0FBRkY7QUFLQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7QUFGRjtBQUtBO0VBQ0Usd0NBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDBDQUFBO0FBRkY7QUFLQTtFQUNFLHdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsMENBQUE7QUFGRjtBQUlJO0VBQ0UsV0FBQTtBQUZOO0FBSUk7RUFDRSxVQUFBO0FBRk47QUFPQTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7QUFKRjtBQUtFO0VBQ0UsZ0NBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkNsSEs7RURtSEwsYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLFdBQUE7QUFISjtBQUtFO0VBQ0UsZ0NBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSx5QkM3SEs7RUQ4SEwsYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7QUFISjtBQU9BO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJDOUlPO0VEK0lQLFdDeElNO0VEeUlOLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSx3Q0FBQTtFQUNBLDZDQUFBO0VBQ0Esa0JBQUE7QUFKRjtBQUtFO0VBQ0Usa0JBQUE7RUFDQSw2QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0NBQUE7QUFISjtBQUtFO0VBQ0UseUJDN0pLO0VEOEpMLDRCQUFBO0FBSEo7QUFJSTtFQUNFLDZCQUFBO0VBQ0EsVUFBQTtBQUZOO0FBSUk7RUFDRSw4QkFBQTtBQUZOO0FBS0U7RUFDRSxxQkFBQTtFQUNBLCtDQUFBO0FBSEo7QUFLRTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDJCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtBQUhKO0FBT0E7RUFDRSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSx3Q0FBQTtBQUpGO0FBS0U7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJDeE1LO0VEeU1MLFNBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtFQUNBLDBCQUFBO0VBQ0EsNkNBQUE7QUFISjtBQUtFO0VBQ0UseUJDaE5LO0VEaU5MLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0VBQ0EsVUFBQTtFQUNBLDhDQUFBO0VBQ0EsOEJBQUE7QUFISjtBQUlJO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQ2hPRztFRGlPSCxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsaURBQUE7QUFGTjtBQU9BO0VBQ0UsK0NBQUE7QUFKRjtBQU9BO0VBQ0U7SUFDRSxpQkFBQTtJQUNBLFlBQUE7SUFDQSxVQUFBO0VBSkY7RUFNQTtJQUNFLGlCQUFBO0lBQ0EsVUFBQTtJQUNBLFFBQUE7RUFKRjtBQUNGO0FBT0E7RUFDRTtJQUNFLFVBQUE7SUFDQSxtQkFBQTtFQUxGO0VBT0E7SUFDRSxVQUFBO0lBQ0EsbUJBQUE7RUFMRjtBQUNGO0FBUUE7RUFDRTtJQUNFLGdDQUFBO0VBTkY7RUFRQTtJQUNFLG1DQUFBO0VBTkY7RUFRQTtJQUNFLGtDQUFBO0VBTkY7RUFRQTtJQUNFLG1DQUFBO0VBTkY7RUFRQTtJQUNFLGtDQUFBO0VBTkY7RUFRQTtJQUNFLG1DQUFBO0VBTkY7RUFRQTtJQUNFLGtDQUFBO0VBTkY7RUFRQTtJQUNFLG1DQUFBO0VBTkY7RUFRQTtJQUNFLGtDQUFBO0VBTkY7RUFRQTtJQUNFLG1DQUFBO0VBTkY7RUFRQTtJQUNFLGdDQUFBO0VBTkY7QUFDRjtBQVNBO0VBQ0U7SUFDRSwwQ0FBQTtJQUNBLFVBQUE7RUFQRjtFQVNBO0lBQ0UsMENBQUE7SUFDQSxVQUFBO0VBUEY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2xhbmRpbmctcGFnZS9sYW5kaW5nLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi92YXInO1xuJHNtX2JyZWFrX3BvaW50OjU2MHB4O1xuLnJvb3QtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xufVxuXG4ub3ZlcmxheSB7XG4gIGhlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAxMDB2dztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgei1pbmRleDogLTE7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiAkY29sb3IyO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBjbGlwLXBhdGg6IGVsbGlwc2UoNTB2dyA0MHZoIGF0IDUwJSA1MCUpO1xuICB0cmFuc2Zvcm06IHNjYWxlKDIpIHRyYW5zbGF0ZSgyN3Z3LCAtMTh2aCkgcm90YXRlKDMzNWRlZyk7XG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbi1vdXQgMC4ycyBib3RoIGxlZnRUb1JpZ2h0O1xufVxuXG4uZHAtbG9nbyB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluLW91dCAwLjJzIGJvdGggZmFkZUluO1xufVxuXG4ubmF2YmFyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAkb2ZmLXdoaXRlO1xuICBmb250LXNpemU6IDJyZW07XG4gIHBhZGRpbmc6IDEuNnJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5uYXYtaXRlbXMge1xuICAubmF2LWl0ZW0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwYWRkaW5nOiAwLjJyZW0gMDtcbiAgICBtYXJnaW46IDAuNnJlbSAxcmVtO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItYm90dG9tOiAwLjNyZW0gc29saWQgJGNvbG9yNDtcbiAgICBjb2xvcjogJG9mZi13aGl0ZTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDE7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogJG9mZi13aGl0ZTtcbiAgbWFyZ2luLXRvcDogNSU7XG59XG5cbi5zaG9ydC1iaW8ge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgcGFkZGluZzogMS42cmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBhbmltYXRpb246IDFzIGVhc2UtaW4tb3V0IDAuMnMgYm90aCBmYWRlSW47XG59XG5cbi5xdW90ZSB7XG4gIGZvbnQtZmFtaWx5OiAnQ29ybW9yYW50IEdhcmFtb25kJywgc2VyaWY7XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBwYWRkaW5nOiAxcmVtO1xuICBwYWRkaW5nLXRvcDogMHJlbTtcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluLW91dCAwLjRzIGJvdGggZmFkZUluO1xufVxuXG4ubmFtZSB7XG4gIGZvbnQtZmFtaWx5OiAnQ29ybW9yYW50IEdhcmFtb25kJywgc2VyaWY7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgcGFkZGluZy10b3A6IDAuNnJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNHJlbTtcbiAgd29yZC1zcGFjaW5nOiAwLjJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogLTIuNXJlbTtcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluLW91dCAwLjZzIGJvdGggZmFkZUluO1xuICAmOmhvdmVyIHtcbiAgICAuc3RyaXA6OmFmdGVyIHtcbiAgICAgIGxlZnQ6IC0xcmVtO1xuICAgIH1cbiAgICAuc3RyaXA6OmJlZm9yZSB7XG4gICAgICBsZWZ0OiAxcmVtO1xuICAgIH1cbiAgfVxufVxuXG4uc3RyaXAge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDI4cmVtO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbi1vdXQgMC44cyBib3RoIGZhZGVJbjtcbiAgJjo6YmVmb3JlIHtcbiAgICB0cmFuc2l0aW9uOiAwLjNzIGFsbCBlYXNlLWluLW91dDtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjE7XG4gICAgbWFyZ2luOiAycHggMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IC0xcmVtO1xuICB9XG4gICY6OmFmdGVyIHtcbiAgICB0cmFuc2l0aW9uOiAwLjNzIGFsbCBlYXNlLWluLW91dDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjM7XG4gICAgbWFyZ2luOiAycHggMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgdG9wOiA0cHg7XG4gICAgbGVmdDogMXJlbTtcbiAgfVxufVxuXG4uc3BlY2lhbC1idG4ge1xuICBtaW4td2lkdGg6IDE1cmVtO1xuICBsaW5lLWhlaWdodDogMi4yO1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IxO1xuICBjb2xvcjogJHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMHJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgLjNzIGVhc2UtaW4tb3V0O1xuICBhbmltYXRpb246IGZhZGVJbiAxcyBlYXNlLWluLW91dCAxcyBib3RoO1xuICBib3gtc2hhZG93OiA3cHggNXB4IDhweCAwIHJnYmEoMCwgMCwgMCwgLjMxKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBzcGFuIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuN3JlbSk7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICB9XG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjM7XG4gICAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHBhdXNlZDtcbiAgICAmOjphZnRlciB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMC4ycmVtKTtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIHNwYW4ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0wLjJyZW0pO1xuICAgIH1cbiAgfVxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xuICAgIGJveC1zaGFkb3c6IDRweCA1cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzEpO1xuICB9XG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnXFwwMGJiJztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3BhY2l0eTogMDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogc3ViO1xuICAgIGZvbnQtc2l6ZTogMi43cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNXB4KTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIH1cbn1cblxuLnN0aWNrIHtcbiAgZmxleDogMTtcbiAgbWFyZ2luLXRvcDogLTFyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IC0xO1xuICBhbmltYXRpb246IDFzIGVhc2UtaW4tb3V0IDFzIGJvdGggZmFkZUluO1xuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgaGVpZ2h0OiAyMDB2aDtcbiAgICB3aWR0aDogMS42cmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSk7XG4gICAgYm94LXNoYWRvdzogN3B4IDVweCA4cHggMCByZ2JhKDAsIDAsIDAsIC4zMSk7XG4gIH1cbiAgLnN0aWNrLWRlc2lnbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMTtcbiAgICBwYWRkaW5nOiAxLjRyZW07XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtaW4td2lkdGg6IDguNXJlbTtcbiAgICB0b3A6IDMuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAxMDByZW07XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSk7XG4gICAgei1pbmRleDogNjtcbiAgICBib3gtc2hhZG93OiAxM3B4IDBweCAyMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgIHRyYW5zaXRpb246IDFzIGFsbCBlYXNlLWluLW91dDtcbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGhlaWdodDogMC44cmVtO1xuICAgICAgd2lkdGg6IDAuOHJlbTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjI7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgYm94LXNoYWRvdzogMnJlbSAwcHggMHB4ICRjb2xvcjIsIC0ycmVtIDBweCAwcHggJGNvbG9yMjtcbiAgICB9XG4gIH1cbn1cblxuLnRhZGEtYW5pbWF0aW9uIHtcbiAgYW5pbWF0aW9uOiB0YWRhIDFzIGVhc2UtaW4tb3V0IDBzIDIgbm9ybWFsIGJvdGg7XG59XG5cbkBrZXlmcmFtZXMgbGVmdFRvUmlnaHQge1xuICAwJSB7XG4gICAgZGlzcGxheTogcmVsYXRpdmU7XG4gICAgb3BhY2l0eTogMC4xO1xuICAgIGxlZnQ6IC0yMCU7XG4gIH1cbiAgMTAwJSB7XG4gICAgZGlzcGxheTogcmVsYXRpdmU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBsZWZ0OiAwJTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgdGFkYSB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpIHJvdGF0ZSgwZGVnKTtcbiAgfVxuICAxMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGUoLTRkZWcpO1xuICB9XG4gIDIwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSg0ZGVnKTtcbiAgfVxuICAzMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGUoLTRkZWcpO1xuICB9XG4gIDQwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSg0ZGVnKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGUoLTRkZWcpO1xuICB9XG4gIDYwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSg0ZGVnKTtcbiAgfVxuICA3MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGUoLTRkZWcpO1xuICB9XG4gIDgwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSg0ZGVnKTtcbiAgfVxuICA5MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGUoLTRkZWcpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgc3RyaXBBbmltYXRpb24ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMHB4KSByb3RhdGVaKDBkZWcpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgcm90YXRlWigtMTZkZWcpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiIsIiRiZy1jb2xvcjogIzQwNWNhMTtcbiRjb2xvcjE6ICM4YjAwMDA7XG4kY29sb3IyOiAjMDAwO1xuJGNvbG9yMzogIzgwMDAwMDtcbiRjb2xvcjQ6ICM4YjAwMDA7XG4kdGV4dC1jb2xvcjogI2ZmZmZmZjtcbiRibGFjazogIzU1NTtcbiRvZmYtd2hpdGU6ICNmOGY4Zjg7XG4kd2hpdGU6ICNmZmY7XG4kZGFyazogIzAwMDtcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LandingPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-landing-page',
                templateUrl: './landing-page.component.html',
                styleUrls: ['./landing-page.component.scss']
            }]
    }], function () { return []; }, { ExploreMe: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['ExploreMe']
        }] }); })();


/***/ }),

/***/ "./src/app/navigator/navigator.component.ts":
/*!**************************************************!*\
  !*** ./src/app/navigator/navigator.component.ts ***!
  \**************************************************/
/*! exports provided: NavigatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigatorComponent", function() { return NavigatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../directives/esc-cancelation.directive */ "./src/app/directives/esc-cancelation.directive.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






const _c0 = function (a0) { return { transform: a0 }; };
function NavigatorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavigatorComponent_div_2_Template_div_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const nav_r1 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.onNavItemClick($event, nav_r1.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const nav_r1 = ctx.$implicit;
    const isEven_r2 = ctx.even;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, isEven_r2 ? "translateX(10%)" : "translateX(-10%)"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, isEven_r2 ? "translateX(-10%)" : "translateX(10%)"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", nav_r1.displayName, " ");
} }
class NavigatorComponent {
    constructor(router) {
        this.router = router;
        this.navLinks = [
            { displayName: 'Portfolio', url: '/portfolio' },
            { displayName: 'About & Skills', url: '/about' },
            { displayName: 'Contacts & Profiles', url: '/profiles' },
            { displayName: 'Profile Card', url: '/profile-card' },
            { displayName: 'Blog', url: '/blog' }
        ];
        this.cancellation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() { }
    onBgClick() {
        this.cancellation.emit();
    }
    onNavItemClick(e, url) {
        e.stopPropagation();
        this.router.navigateByUrl(url);
    }
}
NavigatorComponent.ɵfac = function NavigatorComponent_Factory(t) { return new (t || NavigatorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
NavigatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavigatorComponent, selectors: [["app-navigator"]], outputs: { cancellation: "cancellation" }, decls: 3, vars: 2, consts: [["appEscCancelation", "", 1, "navigator-container", 3, "appEscCancelation", "click"], [1, "navLinks"], ["class", "navLink", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], [1, "navLink", 3, "ngStyle", "click"], [3, "ngStyle"]], template: function NavigatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("appEscCancelation", function NavigatorComponent_Template_div_appEscCancelation_0_listener() { return ctx.onBgClick(); })("click", function NavigatorComponent_Template_div_click_0_listener() { return ctx.onBgClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NavigatorComponent_div_2_Template, 3, 7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@slideIn", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.navLinks);
    } }, directives: [_directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_3__["EscCancelationDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"]], styles: ["*[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n\n.navigator-container[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  display: flex;\n  position: fixed;\n  min-width: 100vw;\n  min-height: 100vh;\n  background: rgba(85, 85, 85, 0.9);\n  top: 0;\n  left: 0;\n  z-index: 5;\n  justify-content: center;\n  align-items: center;\n}\n\n.navLinks[_ngcontent-%COMP%] {\n  width: 90vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.navLink[_ngcontent-%COMP%] {\n  padding: 2rem 0;\n  margin: 1rem 0;\n  width: 40%;\n  min-width: 40rem;\n  font-size: 2.4rem;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  text-align: center;\n  background: rgba(248, 248, 248, 0.5);\n  cursor: pointer;\n  border-radius: 0.5rem;\n}\n\n@media (max-width: 1300px) {\n  .navLink[_ngcontent-%COMP%] {\n    width: 60%;\n  }\n}\n\n@media (max-width: 640px) {\n  .navLink[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.navLink[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  color: #fff;\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2aWdhdG9yL25hdmlnYXRvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0tBQUEsc0JBQUE7VUFBQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0Usd0NBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQ0FBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUFFO0VBYkY7SUFjSSxVQUFBO0VBR0Y7QUFDRjs7QUFGRTtFQWhCRjtJQWlCSSxXQUFBO0VBS0Y7QUFDRjs7QUFGQTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtBQUtGIiwiZmlsZSI6InNyYy9hcHAvbmF2aWdhdG9yL25hdmlnYXRvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLm5hdmlnYXRvci1jb250YWluZXIge1xuICBmb250LWZhbWlseTogJ0Nvcm1vcmFudCBHYXJhbW9uZCcsIHNlcmlmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIG1pbi13aWR0aDogMTAwdnc7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kOiByZ2JhKCM1NTUsIDAuOSk7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogNTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5uYXZMaW5rcyB7XG4gIHdpZHRoOiA5MHZ3O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLm5hdkxpbmsge1xuICBwYWRkaW5nOiAycmVtIDA7XG4gIG1hcmdpbjogMXJlbSAwO1xuICB3aWR0aDogNDAlO1xuICBtaW4td2lkdGg6IDQwcmVtO1xuICBmb250LXNpemU6IDIuNHJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogcmdiYSgjZjhmOGY4LCAwLjUpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xuICAgIHdpZHRoOiA2MCU7XG4gIH1cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuLm5hdkxpbms+KiB7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG4iXX0= */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '50%', opacity: 0 }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 1 }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.2s', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.5s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ offset: 0 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 0.8, offset: 0.8 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '-10%', opacity: 1, offset: 0.9 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 1, offset: 1 })
                            ]))
                        ])
                    ], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.2s', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.5s ease-in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ offset: 0 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '10%', offset: 0.1 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', offset: 0.4 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '-50%', opacity: 0, offset: 1 })
                            ]))
                        ])
                    ], { optional: true })
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavigatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navigator',
                templateUrl: './navigator.component.html',
                styleUrls: ['./navigator.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '50%', opacity: 0 }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 1 }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.2s', [
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.5s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ offset: 0 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 0.8, offset: 0.8 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '-10%', opacity: 1, offset: 0.9 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', opacity: 1, offset: 1 })
                                    ]))
                                ])
                            ], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.2s', [
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.5s ease-in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ offset: 0 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '10%', offset: 0.1 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '0%', offset: 0.4 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ marginLeft: '-50%', opacity: 0, offset: 1 })
                                    ]))
                                ])
                            ], { optional: true })
                        ])
                    ])
                ]
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, { cancellation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['cancellation']
        }] }); })();


/***/ }),

/***/ "./src/app/pipes/max-length.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/pipes/max-length.pipe.ts ***!
  \******************************************/
/*! exports provided: MaxLengthPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxLengthPipe", function() { return MaxLengthPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class MaxLengthPipe {
    transform(value, maxLength = 10, prettier = false) {
        let transformedValue = value.slice(0, maxLength);
        if (value.length > maxLength) {
            if (prettier)
                transformedValue = this.makePrettier(transformedValue);
            transformedValue += '...';
        }
        return transformedValue;
    }
    makePrettier(value) {
        return value
            .split(' , ')
            .filter((_, index, arr) => arr.length - 1 !== index && arr.length >= 1)
            .join(', ');
    }
}
MaxLengthPipe.ɵfac = function MaxLengthPipe_Factory(t) { return new (t || MaxLengthPipe)(); };
MaxLengthPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "maxLength", type: MaxLengthPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaxLengthPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'maxLength'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/pipes/no-emoji.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/no-emoji.pipe.ts ***!
  \****************************************/
/*! exports provided: NoEmojiPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoEmojiPipe", function() { return NoEmojiPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NoEmojiPipe {
    transform(value) {
        return value.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '');
    }
}
NoEmojiPipe.ɵfac = function NoEmojiPipe_Factory(t) { return new (t || NoEmojiPipe)(); };
NoEmojiPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "noEmoji", type: NoEmojiPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NoEmojiPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'noEmoji'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/portfolio/portfolio.component.ts":
/*!**************************************************!*\
  !*** ./src/app/portfolio/portfolio.component.ts ***!
  \**************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_tags_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/tags.service */ "./src/app/services/tags.service.ts");
/* harmony import */ var _dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dp-logo/dp-logo.component */ "./src/app/dp-logo/dp-logo.component.ts");
/* harmony import */ var _typing_typing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../typing/typing.component */ "./src/app/typing/typing.component.ts");
/* harmony import */ var _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/back-icon/back-icon.component */ "./src/app/ui/back-icon/back-icon.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _key_skill_btns_key_skill_btns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../key-skill-btns/key-skill-btns.component */ "./src/app/key-skill-btns/key-skill-btns.component.ts");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../projects/projects.component */ "./src/app/projects/projects.component.ts");










const _c0 = ["portfolioHeader"];
const _c1 = ["portfolioArea"];
const _c2 = ["portfolioSelectionArea"];
const _c3 = function (a0) { return { "portfolio-selection__fixed": a0 }; };
class PortfolioComponent {
    constructor(router, tagsService) {
        this.router = router;
        this.tagsService = tagsService;
        this.animatedTypingText = '🙋 Hey, check out my projects by clicking the categories. ';
        this.dpLogoStyle = {
            height: '12rem',
            width: '12rem',
            borderWidth: '3px'
        };
        this.setFixedPostion = false;
    }
    ngOnInit() {
        this.updateAnimatedTextOnce();
    }
    updateAnimatedTextOnce() {
        let updateCount = 0;
        this.tagsService.onTagUpdate.subscribe(() => {
            if (updateCount === 0) {
                this.animatedTypingText =
                    'Great! You got some of great pieces! 😊';
                updateCount++;
            }
        });
    }
    onScroll() {
        const portfolioHeader = this.portfolioHeaderRef.nativeElement;
        const portfolioArea = this.portfolioAreaRef.nativeElement;
        const portfolioSelectionArea = this.portfolioSelectionAreaRef
            .nativeElement;
        const thresoldHeight = portfolioHeader.scrollHeight + portfolioHeader.offsetTop;
        const portfolioSelectionHeight = portfolioSelectionArea.scrollHeight + portfolioSelectionArea.offsetTop;
        if (window.scrollY > thresoldHeight) {
            portfolioArea.style.marginTop = `${portfolioSelectionHeight + 5}px`;
            this.setFixedPostion = true;
        }
        else {
            portfolioArea.style.marginTop = `inherit`;
            this.setFixedPostion = false;
            const factor = 1 - window.scrollY / (thresoldHeight + 40);
            // const netFactor = window.innerWidth < 900 ? 1 : 1 - factor;
            this.dpLogoStyle = Object.assign(Object.assign({}, this.dpLogoStyle), { height: `${12 * factor}rem`, width: `${12 * factor}rem` });
            portfolioHeader.style.opacity = factor.toString();
        }
    }
    onBackBtnClick() {
        this.router.navigateByUrl('/');
    }
}
PortfolioComponent.ɵfac = function PortfolioComponent_Factory(t) { return new (t || PortfolioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_tags_service__WEBPACK_IMPORTED_MODULE_2__["TagsService"])); };
PortfolioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PortfolioComponent, selectors: [["app-portfolio"]], viewQuery: function PortfolioComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.portfolioHeaderRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.portfolioAreaRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.portfolioSelectionAreaRef = _t.first);
    } }, hostBindings: function PortfolioComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("scroll", function PortfolioComponent_scroll_HostBindingHandler() { return ctx.onScroll(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, decls: 16, vars: 7, consts: [[1, "portfolio-bg"], [1, "portfolio-container"], [1, "portfolio-header"], ["portfolioHeader", ""], [3, "height", "width", "borderWidth"], ["time", "2000", "delay", "1500", 3, "text"], [1, "portfolio-area"], ["portfolioArea", ""], [1, "back-icon", 3, "click"], [1, "portfolio-selection", 3, "ngClass"], ["portfolioSelectionArea", ""]], template: function PortfolioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-dp-logo", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-typing", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PortfolioComponent_Template_div_click_8_listener() { return ctx.onBackBtnClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "app-back-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "PORTFOLIO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "app-key-skill-btns");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "app-projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("height", ctx.dpLogoStyle.height)("width", ctx.dpLogoStyle.width)("borderWidth", ctx.dpLogoStyle.borderWidth);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("text", ctx.animatedTypingText);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c3, ctx.setFixedPostion));
    } }, directives: [_dp_logo_dp_logo_component__WEBPACK_IMPORTED_MODULE_3__["DpLogoComponent"], _typing_typing_component__WEBPACK_IMPORTED_MODULE_4__["TypingComponent"], _ui_back_icon_back_icon_component__WEBPACK_IMPORTED_MODULE_5__["BackIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _key_skill_btns_key_skill_btns_component__WEBPACK_IMPORTED_MODULE_7__["KeySkillBtnsComponent"], _projects_projects_component__WEBPACK_IMPORTED_MODULE_8__["ProjectsComponent"]], styles: [".portfolio-bg[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  min-width: 100vw;\n  position: relative;\n  background-color: #405ca1;\n  overflow: hidden;\n  display: flex;\n}\n.portfolio-bg[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: fixed;\n  display: block;\n  height: 100vh;\n  min-height: 500px;\n  width: 100vw;\n  min-width: 500px;\n  overflow: hidden;\n  background-color: #000;\n  transform: rotateZ(-11deg) scale(1.5);\n  top: -65vh;\n  left: -25vw;\n}\n.portfolio-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  z-index: 10;\n  padding: 3.5rem;\n  flex-direction: column;\n  color: #fff;\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: stretch;\n  margin: auto;\n  align-items: center;\n  font-size: 1.8rem;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-header[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1rem 2rem;\n  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-area[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 50;\n  position: relative;\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-area[_ngcontent-%COMP%]   .portfolio-selection[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-area[_ngcontent-%COMP%]   .portfolio-selection.portfolio-selection__fixed[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  z-index: 1;\n  background-color: #000;\n  width: 100%;\n  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);\n}\n.portfolio-container[_ngcontent-%COMP%]   .portfolio-area[_ngcontent-%COMP%]   .portfolio-selection[_ngcontent-%COMP%]    > h1[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  font-weight: normal;\n  font-size: 3.2rem;\n  letter-spacing: 1px;\n  margin: 1rem auto;\n  text-align: center;\n}\n@media (max-width: 900px) {\n  .portfolio-container[_ngcontent-%COMP%] {\n    padding: 3.5rem 0.5rem;\n  }\n}\n@media (max-width: 74rem) {\n  .portfolio-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJDTlM7RURPVCxnQkFBQTtFQUNBLGFBQUE7QUFERjtBQUdFO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkNqQks7RURrQkwscUNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQURKO0FBTUE7RUFDRSxhQUFBO0VBQ0EsT0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQzdCTTtBRDBCUjtBQUtFO0VBQ0UsYUFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO1VBQUEsaUJBQUE7QUFISjtBQUtJO0VBQ0UscUJBQUE7RUFDQSxrQkFBQTtFQUNBLDREQUFBO0FBSE47QUFRRTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQU5KO0FBUUk7RUFFRSx5QkFBQTtLQUFBLHNCQUFBO1VBQUEsaUJBQUE7QUFQTjtBQVNNO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0VBQ0Esc0JDdEVDO0VEdUVELFdBQUE7RUFDQSwyQ0FBQTtBQVBSO0FBV007RUFDRSx3Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFUUjtBQWVBO0VBQ0U7SUFDRSxzQkFBQTtFQVpGO0FBQ0Y7QUFlQTtFQUNFO0lBQ0Usc0JBQUE7RUFiRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcG9ydGZvbGlvL3BvcnRmb2xpby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL3Zhcic7XG5cbi5wb3J0Zm9saW8tYmcge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgbWluLXdpZHRoOiAxMDB2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmctY29sb3I7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IGZsZXg7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIG1pbi1oZWlnaHQ6IDUwMHB4O1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMjtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTExZGVnKSBzY2FsZSgxLjUpO1xuICAgIHRvcDogLTY1dmg7XG4gICAgbGVmdDogLTI1dnc7XG4gIH1cblxufVxuXG4ucG9ydGZvbGlvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDE7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiAxMDtcbiAgcGFkZGluZzogMy41cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBjb2xvcjogJHdoaXRlO1xuXG4gIC5wb3J0Zm9saW8taGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAgICYgPiAqIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcbiAgICB9XG5cbiAgfVxuXG4gIC5wb3J0Zm9saW8tYXJlYSB7XG4gICAgbWFyZ2luOiAwLjRyZW0gMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB6LWluZGV4OiA1MDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAucG9ydGZvbGlvLXNlbGVjdGlvbiB7XG4gICAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IyO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICAgICYucG9ydGZvbGlvLXNlbGVjdGlvbl9fZml4ZWQge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMjtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA4cHggMjBweCByZ2JhKCRjb2xvcjogJGRhcmssICRhbHBoYTogMC40KTtcbiAgICAgICAgLy8gdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgICB9XG5cbiAgICAgICYgPiBoMSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnQ29ybW9yYW50IEdhcmFtb25kJywgc2VyaWY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc2l6ZTogMy4ycmVtO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgICAgICBtYXJnaW46IDFyZW0gYXV0bztcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcbiAgLnBvcnRmb2xpby1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDMuNXJlbSAwLjVyZW07XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc0cmVtKSB7XG4gIC5wb3J0Zm9saW8taGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG59XG4iLCIkYmctY29sb3I6ICM0MDVjYTE7XG4kY29sb3IxOiAjOGIwMDAwO1xuJGNvbG9yMjogIzAwMDtcbiRjb2xvcjM6ICM4MDAwMDA7XG4kY29sb3I0OiAjOGIwMDAwO1xuJHRleHQtY29sb3I6ICNmZmZmZmY7XG4kYmxhY2s6ICM1NTU7XG4kb2ZmLXdoaXRlOiAjZjhmOGY4O1xuJHdoaXRlOiAjZmZmO1xuJGRhcms6ICMwMDA7XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PortfolioComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-portfolio',
                templateUrl: './portfolio.component.html',
                styleUrls: ['./portfolio.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services_tags_service__WEBPACK_IMPORTED_MODULE_2__["TagsService"] }]; }, { portfolioHeaderRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['portfolioHeader']
        }], portfolioAreaRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['portfolioArea']
        }], portfolioSelectionAreaRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['portfolioSelectionArea']
        }], onScroll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['window:scroll']
        }] }); })();


/***/ }),

/***/ "./src/app/profile-card/profile-card.component.ts":
/*!********************************************************!*\
  !*** ./src/app/profile-card/profile-card.component.ts ***!
  \********************************************************/
/*! exports provided: ProfileCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileCardComponent", function() { return ProfileCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




const _c0 = function (a0) { return { "tada-animation": a0 }; };
class ProfileCardComponent {
    constructor(router) {
        this.router = router;
        this.ExploreMe = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.startTadaAnimation = false;
    }
    ngOnInit() {
        setInterval(() => {
            this.startTadaAnimation = !this.startTadaAnimation;
        }, 3000);
    }
    onExploreMeClick() {
        this.ExploreMe.emit();
        this.router.navigateByUrl('/');
    }
}
ProfileCardComponent.ɵfac = function ProfileCardComponent_Factory(t) { return new (t || ProfileCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
ProfileCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileCardComponent, selectors: [["app-profile-card"]], outputs: { ExploreMe: "ExploreMe" }, decls: 48, vars: 3, consts: [[1, "container"], [1, "card"], [1, "strip-block"], [1, "profile-logo"], ["src", "assets/img/surya-raj.png", "alt", ""], [1, "strip"], [1, "short-details"], [1, "tagLine"], [1, "quote"], [1, "details"], [1, "nameBlock"], [1, "round-shape", "name"], [1, "divider"], [1, "stick", "stick1"], [1, "stick", "stick2"], [1, "bio"], [3, "ngClass", "mouseover"], [1, "round-shape", "projects-link", 3, "click"], [1, "social"], [1, "social-icon"], ["href", "https://www.linkedin.com/in/suryakantamangaraj/", "target", "_blank"], ["src", "assets/assert/contactIcon/linkedin.svg", "alt", "linkedin icon"], ["href", "https://www.instagram.com/suryaraj.ig/", "target", "_blank"], ["src", "assets/assert/contactIcon/instagram.svg", "alt", "instagram icon"], ["href", "https://github.com/suryakantamangaraj", "target", "_blank"], ["src", "assets/assert/contactIcon/github.svg", "alt", "github icon"], ["href", "https://www.facebook.com/suryaraj.fb", "target", "_blank"], ["src", "assets/assert/contactIcon/facebook.svg", "alt", "facebook icon"], ["href", "https://twitter.com/_suryaraj_", "target", "_blank"], ["src", "assets/assert/contactIcon/twitter.svg", "alt", "twitter icon"], ["href", "mailto:surya.socialnetworking@gmail.com"], ["src", "assets/assert/contactIcon/email.svg", "alt", "email icon"]], template: function ProfileCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Designer | Developer | Mentor ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "blockquote", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " \"I enjoy turning complex problems into simple.\" ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h1", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Surya Raj ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " I am passionate about building apps that improve the lives of those around me. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " I like to do the things from scratch and enjoy bringing ideas to real-world applications. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function ProfileCardComponent_Template_div_mouseover_22_listener() { return ctx.startTadaAnimation = false; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileCardComponent_Template_a_click_23_listener() { return ctx.onExploreMeClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Explore Me ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "img", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "img", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "img", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx.startTadaAnimation));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], styles: ["@charset \"UTF-8\";\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 100vh;\n  align-items: center;\n  padding: 2rem 0;\n  justify-content: center;\n  background-color: #405ca1;\n  color: #ffffff;\n}\n.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  background-color: #000;\n  height: auto;\n  max-height: 90%;\n  width: 45rem;\n  text-align: center;\n  overflow-x: hidden;\n  position: relative;\n  z-index: 1;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  overflow: hidden;\n  border-radius: 5px;\n  box-shadow: 12px 11px 14px 0px rgba(0, 0, 0, 0.36);\n  transition: all 0.3s ease-in-out;\n  animation: dropin 1s ease-in-out 0s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%] {\n  height: 14rem;\n  width: 14rem;\n  margin-top: 5.5rem;\n  display: inline-block;\n  position: relative;\n  z-index: 5;\n  border-radius: 50%;\n  perspective: 1500px;\n  animation: dropin 1s ease-in-out 0.4s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: relative;\n  border: 0.8rem solid #8b0000;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  transition: all 0.5s ease-in-out;\n  perspective: 1500px;\n}\n.container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]::after {\n  content: \"Surya Raj\";\n  display: flex;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  background-color: #8b0000;\n  border: 0.8rem solid #800000;\n  top: 0px;\n  left: 0px;\n  z-index: 10;\n  font-size: 2rem;\n  transition: all 0.5s ease-in-out;\n  transform: rotateY(180deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  perspective: 1500px;\n}\n.container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: rotateY(180deg);\n}\n.container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:hover::after {\n  transform: rotateY(0deg);\n}\n.container[_ngcontent-%COMP%]   .strip[_ngcontent-%COMP%] {\n  background-color: #8b0000;\n  height: 16.2rem;\n  width: 150%;\n  margin-left: -5rem;\n  margin-top: -8rem;\n  transform: rotateZ(-16deg);\n  z-index: -1;\n  position: absolute;\n  animation: stripAnimation 1s ease-in-out 1.4s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .strip[_ngcontent-%COMP%]::after {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n  height: 100%;\n  width: 20%;\n  background-color: #ffffff;\n  opacity: 0;\n  top: 0;\n  left: 0;\n}\n.container[_ngcontent-%COMP%]   .strip[_ngcontent-%COMP%]:hover::after {\n  animation: fadeLeftToRight 1s ease-in-out 0s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .strip-block[_ngcontent-%COMP%]:hover   .strip[_ngcontent-%COMP%]:after {\n  animation: fadeLeftToRight 1s ease-in-out 0s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .short-details[_ngcontent-%COMP%] {\n  position: relative;\n  animation: dropin 1s ease-in-out 0.4s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .short-details[_ngcontent-%COMP%]   .tagLine[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  font-size: 1.6rem;\n  font-weight: lighter;\n  font-style: italic;\n  padding: 0.5rem;\n}\n.container[_ngcontent-%COMP%]   .short-details[_ngcontent-%COMP%]   .quote[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  display: inline-block;\n  font-size: 2rem;\n  font-weight: 400;\n  width: 65%;\n  padding: 0.5rem 2rem;\n  padding-bottom: 1rem;\n  line-height: 1.2;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n  margin-top: 6rem;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .nameBlock[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in-out;\n  animation: dropin 1s ease-in-out 0.6s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .nameBlock[_ngcontent-%COMP%]:hover   .divider[_ngcontent-%COMP%]    > .stick1[_ngcontent-%COMP%] {\n  transform: translateX(-2rem) !important;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .nameBlock[_ngcontent-%COMP%]:hover   .divider[_ngcontent-%COMP%]    > .stick2[_ngcontent-%COMP%] {\n  transform: translateX(2rem) !important;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  display: inline-block;\n  position: relative;\n  width: 60%;\n  font-size: 2rem;\n  font-weight: 400;\n  line-height: 1.6;\n  text-transform: uppercase;\n  letter-spacing: 0.2rem;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .bio[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 70%;\n  font-size: 1.6rem;\n  margin: 0.4rem;\n  line-height: 1.2;\n  font-weight: lighter;\n  margin-bottom: 0.8rem;\n  text-align: center;\n  word-spacing: 1px;\n  animation: dropin 1s ease-in-out 0.8s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 15rem;\n  line-height: 2.2;\n  font-size: 1.4rem;\n  padding: 0.5rem;\n  margin-top: 1.5rem;\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer;\n  vertical-align: middle;\n  transition: all 0.3s ease-in-out;\n  box-shadow: 7px 5px 8px 0px rgba(0, 0, 0, 0.31);\n  animation: dropin 1s ease-in-out 1s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  transform: translateX(0.7rem);\n  display: inline-block;\n  transition: all 0.3s ease-in-out;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]:hover {\n  background-color: #800000;\n  animation-play-state: paused;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(0.2rem);\n  opacity: 1;\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  transform: translateX(-0.2rem);\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]:active {\n  transform: scale(0.8);\n  box-shadow: 4px 5px 5px 0px rgba(0, 0, 0, 0.31);\n}\n.container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .projects-link[_ngcontent-%COMP%]::after {\n  content: \"\u00BB\";\n  position: relative;\n  opacity: 0;\n  vertical-align: sub;\n  font-size: 2.7rem;\n  line-height: 0;\n  transform: translateX(25px);\n  display: inline-block;\n  transition: all 0.3s ease-in-out;\n}\n.container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%] {\n  display: block;\n  padding: 3rem 3rem;\n  padding-top: 0;\n  margin-top: 0.6rem;\n  animation: dropin 1s ease-in-out 1.2s 1 normal both;\n}\n.container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   .social-icon[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 3.4rem;\n  height: 3.4rem;\n  margin: 0.2rem 0.5rem;\n  background-color: #ffffff;\n  transition: all 0.3s ease-in-out;\n}\n.container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   .social-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n.container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   .social-icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.3);\n}\n.divider[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  position: relative;\n}\n.divider[_ngcontent-%COMP%]   .stick[_ngcontent-%COMP%] {\n  display: inline-block;\n  position: relative;\n  height: 2px;\n  background-color: #8b0000;\n  margin: 2px 0;\n  width: 75%;\n  clear: both;\n}\n.divider[_ngcontent-%COMP%]   .stick1[_ngcontent-%COMP%] {\n  transform: translateX(1.5rem);\n  transition: all 0.3s ease-in-out;\n}\n.divider[_ngcontent-%COMP%]   .stick2[_ngcontent-%COMP%] {\n  transform: translateX(-1.5rem);\n  transition: all 0.3s ease-in-out;\n}\n.divider[_ngcontent-%COMP%]:hover   .stick1[_ngcontent-%COMP%] {\n  transform: translateX(-1.5rem) !important;\n}\n.divider[_ngcontent-%COMP%]:hover   .stick2[_ngcontent-%COMP%] {\n  transform: translateX(1.5rem) !important;\n}\n.round-shape[_ngcontent-%COMP%] {\n  background-color: #8b0000;\n  border-radius: 100rem;\n  padding: 0.2rem 2rem;\n}\n.tada-animation[_ngcontent-%COMP%] {\n  animation: tada 1s ease-in-out 0s 2 normal both;\n}\n@media (max-height: 740px) and (min-width: 436px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n}\n@media (max-height: 660px) and (min-width: 436px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 6px;\n  }\n\n  .container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n    margin-top: 8rem;\n  }\n}\n@media (max-height: 740px) {\n  .container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    overflow-y: auto;\n  }\n}\n@media only screen and (max-width: 768px) {\n  .container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%] {\n    margin-top: 30px !important;\n  }\n  .container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n    margin-top: 8rem !important;\n  }\n}\n@media (max-width: 460px) and (min-height: 100px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 8px;\n  }\n\n  .container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 90vw;\n  }\n  .container[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%] {\n    width: 14rem;\n    height: 14rem;\n    margin-top: 14rem;\n  }\n  .container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n    margin-top: 10rem;\n  }\n}\n@media (max-width: 360px) and (min-height: 100px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n\n  .container[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n    margin-top: 7rem;\n  }\n  .container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   .social-icon[_ngcontent-%COMP%] {\n    width: 2.4rem;\n    height: 2.4rem;\n  }\n}\n@media (max-width: 270px) and (min-height: 100px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 5px;\n  }\n\n  .container[_ngcontent-%COMP%]   .social[_ngcontent-%COMP%]   .social-icon[_ngcontent-%COMP%] {\n    width: 1.4rem;\n    height: 1.4rem;\n  }\n}\n@media (max-width: 170px) and (min-height: 100px) {\n  html[_ngcontent-%COMP%] {\n    font-size: 1px;\n  }\n}\n@keyframes fadeLeftToRight {\n  0% {\n    opacity: 0.1;\n    left: -10%;\n  }\n  100% {\n    opacity: 0.7;\n    left: 120%;\n  }\n}\n@keyframes dropin {\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes tada {\n  0% {\n    transform: scale(1) rotate(0deg);\n  }\n  10% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  20% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  30% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  40% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  50% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  60% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  70% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  80% {\n    transform: scale(1.1) rotate(4deg);\n  }\n  90% {\n    transform: scale(1.1) rotate(-4deg);\n  }\n  100% {\n    transform: scale(1) rotate(0deg);\n  }\n}\n@keyframes stripAnimation {\n  0% {\n    transform: translateX(-10px) rotateZ(0deg);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px) rotateZ(-16deg);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZmlsZS1jYXJkL3Byb2ZpbGUtY2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUVoQjtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQ1RTO0VEVVQsY0NMVztBREtiO0FBQ0U7RUFDRSxzQkNWSztFRFdMLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO1VBQUEsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0RBQUE7RUFDQSxnQ0FBQTtFQUNBLGlEQUFBO0FBQ0o7QUFDRTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtREFBQTtBQUNKO0FBQUk7RUFDRSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0FBRU47QUFBSTtFQUNFLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkN2REc7RUR3REgsNEJBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSwwQkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxtQkFBQTtBQUVOO0FBQ007RUFDRSwwQkFBQTtBQUNSO0FBRUk7RUFDRSx3QkFBQTtBQUFOO0FBR0U7RUFDRSx5QkM1RUs7RUQ2RUwsZUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSwyREFBQTtBQURKO0FBRUk7RUFDRSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7QUFBTjtBQUVJO0VBQ0UsMERBQUE7QUFBTjtBQUlJO0VBQ0UsMERBQUE7QUFGTjtBQUtFO0VBQ0Usa0JBQUE7RUFDQSxtREFBQTtBQUhKO0FBSUk7RUFDRSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFGTjtBQUlJO0VBQ0Usd0NBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxvQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7QUFGTjtBQUtFO0VBQ0UsZ0JBQUE7QUFISjtBQUlJO0VBQ0UsZ0NBQUE7RUFDQSxtREFBQTtBQUZOO0FBSVE7RUFDRSx1Q0FBQTtBQUZWO0FBSVE7RUFDRSxzQ0FBQTtBQUZWO0FBTUk7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtBQUpOO0FBTUk7RUFDRSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbURBQUE7QUFKTjtBQU1JO0VBQ0UscUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLGdDQUFBO0VBQ0EsK0NBQUE7RUFDQSxpREFBQTtBQUpOO0FBTU07RUFDRSw2QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0NBQUE7QUFKUjtBQU1NO0VBQ0UseUJDdExDO0VEdUxELDRCQUFBO0FBSlI7QUFLUTtFQUNFLDZCQUFBO0VBQ0EsVUFBQTtBQUhWO0FBS1E7RUFDRSw4QkFBQTtBQUhWO0FBTU07RUFDRSxxQkFBQTtFQUNBLCtDQUFBO0FBSlI7QUFNTTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDJCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtBQUpSO0FBUUU7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxtREFBQTtBQU5KO0FBT0k7RUFDRSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0FBTE47QUFNTTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBSlI7QUFNTTtFQUNFLHFCQUFBO0FBSlI7QUFVQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBUEY7QUFRRTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUJDclBLO0VEc1BMLGFBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQU5KO0FBUUU7RUFDRSw2QkFBQTtFQUNBLGdDQUFBO0FBTko7QUFRRTtFQUNFLDhCQUFBO0VBQ0EsZ0NBQUE7QUFOSjtBQVNJO0VBQ0UseUNBQUE7QUFQTjtBQVNJO0VBQ0Usd0NBQUE7QUFQTjtBQVlBO0VBQ0UseUJDN1FPO0VEOFFQLHFCQUFBO0VBQ0Esb0JBQUE7QUFURjtBQVlBO0VBQ0UsK0NBQUE7QUFURjtBQVlBO0VBQ0U7SUFDRSxjQUFBO0VBVEY7QUFDRjtBQVlBO0VBQ0U7SUFDRSxjQUFBO0VBVkY7O0VBYUU7SUFDRSxnQkFBQTtFQVZKO0FBQ0Y7QUFjQTtFQUVJO0lBQ0UsZ0JBQUE7RUFiSjtBQUNGO0FBaUJBO0VBRUk7SUFDRSwyQkFBQTtFQWhCSjtFQWtCRTtJQUNFLDJCQUFBO0VBaEJKO0FBQ0Y7QUFvQkE7RUFDRTtJQUNFLGNBQUE7RUFsQkY7O0VBcUJFO0lBQ0UsV0FBQTtFQWxCSjtFQW9CRTtJQUNFLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUFsQko7RUFvQkU7SUFDRSxpQkFBQTtFQWxCSjtBQUNGO0FBc0JBO0VBQ0U7SUFDRSxjQUFBO0VBcEJGOztFQXVCRTtJQUNFLGdCQUFBO0VBcEJKO0VBdUJJO0lBQ0UsYUFBQTtJQUNBLGNBQUE7RUFyQk47QUFDRjtBQTBCQTtFQUNFO0lBQ0UsY0FBQTtFQXhCRjs7RUE0Qkk7SUFDRSxhQUFBO0lBQ0EsY0FBQTtFQXpCTjtBQUNGO0FBOEJBO0VBQ0U7SUFDRSxjQUFBO0VBNUJGO0FBQ0Y7QUErQkE7RUFDRTtJQUNFLFlBQUE7SUFDQSxVQUFBO0VBN0JGO0VBK0JBO0lBQ0UsWUFBQTtJQUNBLFVBQUE7RUE3QkY7QUFDRjtBQWdDQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLG1CQUFBO0VBOUJGO0VBZ0NBO0lBQ0UsVUFBQTtJQUNBLG1CQUFBO0VBOUJGO0FBQ0Y7QUFpQ0E7RUFDRTtJQUNFLGdDQUFBO0VBL0JGO0VBaUNBO0lBQ0UsbUNBQUE7RUEvQkY7RUFpQ0E7SUFDRSxrQ0FBQTtFQS9CRjtFQWlDQTtJQUNFLG1DQUFBO0VBL0JGO0VBaUNBO0lBQ0Usa0NBQUE7RUEvQkY7RUFpQ0E7SUFDRSxtQ0FBQTtFQS9CRjtFQWlDQTtJQUNFLGtDQUFBO0VBL0JGO0VBaUNBO0lBQ0UsbUNBQUE7RUEvQkY7RUFpQ0E7SUFDRSxrQ0FBQTtFQS9CRjtFQWlDQTtJQUNFLG1DQUFBO0VBL0JGO0VBaUNBO0lBQ0UsZ0NBQUE7RUEvQkY7QUFDRjtBQWtDQTtFQUNFO0lBQ0UsMENBQUE7SUFDQSxVQUFBO0VBaENGO0VBa0NBO0lBQ0UsMENBQUE7SUFDQSxVQUFBO0VBaENGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9wcm9maWxlLWNhcmQvcHJvZmlsZS1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vdmFyJztcblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMnJlbSAwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJnLWNvbG9yO1xuICBjb2xvcjogJHRleHQtY29sb3I7XG4gIC5jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IyO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBtYXgtaGVpZ2h0OiA5MCU7XG4gICAgd2lkdGg6IDQ1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYm94LXNoYWRvdzogMTJweCAxMXB4IDE0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zNik7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgYW5pbWF0aW9uOiBkcm9waW4gMXMgZWFzZS1pbi1vdXQgMHMgMSBub3JtYWwgYm90aDtcbiAgfVxuICAucHJvZmlsZS1sb2dvIHtcbiAgICBoZWlnaHQ6IDE0cmVtO1xuICAgIHdpZHRoOiAxNHJlbTtcbiAgICBtYXJnaW4tdG9wOiA1LjVyZW07XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiA1O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwZXJzcGVjdGl2ZTogMTUwMHB4O1xuICAgIGFuaW1hdGlvbjogZHJvcGluIDFzIGVhc2UtaW4tb3V0IDAuNHMgMSBub3JtYWwgYm90aDtcbiAgICBpbWcge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYm9yZGVyOiAwLjhyZW0gc29saWQgJGNvbG9yMTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gICAgICBwZXJzcGVjdGl2ZTogMTUwMHB4O1xuICAgIH1cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnU3VyeWEgUmFqJztcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjE7XG4gICAgICBib3JkZXI6IDAuOHJlbSBzb2xpZCAkY29sb3IzO1xuICAgICAgdG9wOiAwcHg7XG4gICAgICBsZWZ0OiAwcHg7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XG4gICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICBwZXJzcGVjdGl2ZTogMTUwMHB4O1xuICAgIH1cbiAgICAmOmhvdmVyIHtcbiAgICAgIGltZyB7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xuICAgICAgfVxuICAgIH1cbiAgICAmOmhvdmVyOjphZnRlciB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XG4gICAgfVxuICB9XG4gIC5zdHJpcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yMTtcbiAgICBoZWlnaHQ6IDE2LjJyZW07XG4gICAgd2lkdGg6IDE1MCU7XG4gICAgbWFyZ2luLWxlZnQ6IC01cmVtO1xuICAgIG1hcmdpbi10b3A6IC04cmVtO1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtMTZkZWcpO1xuICAgIHotaW5kZXg6IC0xO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbmltYXRpb246IHN0cmlwQW5pbWF0aW9uIDFzIGVhc2UtaW4tb3V0IDEuNHMgMSBub3JtYWwgYm90aDtcbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIHdpZHRoOiAyMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgfVxuICAgICY6aG92ZXI6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogZmFkZUxlZnRUb1JpZ2h0IDFzIGVhc2UtaW4tb3V0IDBzIDEgbm9ybWFsIGJvdGg7XG4gICAgfVxuICB9XG4gIC5zdHJpcC1ibG9jazpob3ZlciB7XG4gICAgLnN0cmlwOmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogZmFkZUxlZnRUb1JpZ2h0IDFzIGVhc2UtaW4tb3V0IDBzIDEgbm9ybWFsIGJvdGg7XG4gICAgfVxuICB9XG4gIC5zaG9ydC1kZXRhaWxzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYW5pbWF0aW9uOiBkcm9waW4gMXMgZWFzZS1pbi1vdXQgMC40cyAxIG5vcm1hbCBib3RoO1xuICAgIC50YWdMaW5lIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgIH1cbiAgICAucXVvdGUge1xuICAgICAgZm9udC1mYW1pbHk6ICdDb3Jtb3JhbnQgR2FyYW1vbmQnLCBzZXJpZjtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICB3aWR0aDogNjUlO1xuICAgICAgcGFkZGluZzogMC41cmVtIDJyZW07XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgfVxuICB9XG4gIC5kZXRhaWxzIHtcbiAgICBtYXJnaW4tdG9wOiA2cmVtO1xuICAgIC5uYW1lQmxvY2sge1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgICBhbmltYXRpb246IGRyb3BpbiAxcyBlYXNlLWluLW91dCAwLjZzIDEgbm9ybWFsIGJvdGg7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgLmRpdmlkZXIgPiAuc3RpY2sxIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTJyZW0pICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLmRpdmlkZXIgPiAuc3RpY2syIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMnJlbSkgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAubmFtZSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB3aWR0aDogNjAlO1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcbiAgICB9XG4gICAgLmJpbyB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogNzAlO1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBtYXJnaW46IDAuNHJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuOHJlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHdvcmQtc3BhY2luZzogMXB4O1xuICAgICAgYW5pbWF0aW9uOiBkcm9waW4gMXMgZWFzZS1pbi1vdXQgMC44cyAxIG5vcm1hbCBib3RoO1xuICAgIH1cbiAgICAucHJvamVjdHMtbGluayB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogMTVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMi4yO1xuICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICBtYXJnaW4tdG9wOiAxLjVyZW07XG4gICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIGJveC1zaGFkb3c6IDdweCA1cHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzEpO1xuICAgICAgYW5pbWF0aW9uOiBkcm9waW4gMXMgZWFzZS1pbi1vdXQgMXMgMSBub3JtYWwgYm90aDtcbiAgICAgIC8vIGFuaW1hdGlvbjogdGFkYSAxcyBlYXNlLWluLW91dCAwcyBpbmZpbml0ZSBub3JtYWwgYm90aDtcbiAgICAgIHNwYW4ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMC43cmVtKTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIH1cbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IzO1xuICAgICAgICBhbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAuMnJlbSk7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgfVxuICAgICAgICBzcGFuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTAuMnJlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xuICAgICAgICBib3gtc2hhZG93OiA0cHggNXB4IDVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjMxKTtcbiAgICAgIH1cbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJ1xcMDBiYic7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHN1YjtcbiAgICAgICAgZm9udC1zaXplOiAyLjdyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjVweCk7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC5zb2NpYWwge1xuICAgIGRpc3BsYXk6IGJsb2NrOyAvLyBwYWRkaW5nOiAxcmVtIDA7XG4gICAgcGFkZGluZzogM3JlbSAzcmVtO1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIG1hcmdpbi10b3A6IDAuNnJlbTtcbiAgICBhbmltYXRpb246IGRyb3BpbiAxcyBlYXNlLWluLW91dCAxLjJzIDEgbm9ybWFsIGJvdGg7XG4gICAgLnNvY2lhbC1pY29uIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHdpZHRoOiAzLjRyZW07XG4gICAgICBoZWlnaHQ6IDMuNHJlbTtcbiAgICAgIG1hcmdpbjogMC4ycmVtIDAuNXJlbTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIGltZyB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uZGl2aWRlciB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC5zdGljayB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IxO1xuICAgIG1hcmdpbjogMnB4IDA7XG4gICAgd2lkdGg6IDc1JTtcbiAgICBjbGVhcjogYm90aDtcbiAgfVxuICAuc3RpY2sxIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMS41cmVtKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgfVxuICAuc3RpY2syIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEuNXJlbSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XG4gIH1cbiAgJjpob3ZlciB7XG4gICAgLnN0aWNrMSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEuNXJlbSkgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLnN0aWNrMiB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMS41cmVtKSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuXG4ucm91bmQtc2hhcGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3IxO1xuICBib3JkZXItcmFkaXVzOiAxMDByZW07XG4gIHBhZGRpbmc6IDAuMnJlbSAycmVtO1xufVxuXG4udGFkYS1hbmltYXRpb24ge1xuICBhbmltYXRpb246IHRhZGEgMXMgZWFzZS1pbi1vdXQgMHMgMiBub3JtYWwgYm90aDtcbn1cblxuQG1lZGlhIChtYXgtaGVpZ2h0OiA3NDBweCkgYW5kIChtaW4td2lkdGg6IDQzNnB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogOHB4O1xuICB9XG59XG5cbkBtZWRpYSAobWF4LWhlaWdodDogNjYwcHgpIGFuZCAobWluLXdpZHRoOiA0MzZweCkge1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDZweDtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICAuZGV0YWlscyB7XG4gICAgICBtYXJnaW4tdG9wOiA4cmVtO1xuICAgIH1cbiAgfVxufVxuXG5AbWVkaWEgKG1heC1oZWlnaHQ6IDc0MHB4KSB7XG4gIC5jb250YWluZXIge1xuICAgIC5jYXJkIHtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmNvbnRhaW5lciB7XG4gICAgLnByb2ZpbGUtbG9nbyB7XG4gICAgICBtYXJnaW4tdG9wOiAzMHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5kZXRhaWxzIHtcbiAgICAgIG1hcmdpbi10b3A6IDhyZW0gIWltcG9ydGFudDtcbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ2MHB4KSBhbmQgKG1pbi1oZWlnaHQ6IDEwMHB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogOHB4O1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIC5jYXJkIHtcbiAgICAgIHdpZHRoOiA5MHZ3O1xuICAgIH1cbiAgICAucHJvZmlsZS1sb2dvIHtcbiAgICAgIHdpZHRoOiAxNHJlbTtcbiAgICAgIGhlaWdodDogMTRyZW07XG4gICAgICBtYXJnaW4tdG9wOiAxNHJlbTtcbiAgICB9XG4gICAgLmRldGFpbHMge1xuICAgICAgbWFyZ2luLXRvcDogMTByZW07XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAzNjBweCkgYW5kIChtaW4taGVpZ2h0OiAxMDBweCkge1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDdweDtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICAuZGV0YWlscyB7XG4gICAgICBtYXJnaW4tdG9wOiA3cmVtO1xuICAgIH1cbiAgICAuc29jaWFsIHtcbiAgICAgIC5zb2NpYWwtaWNvbiB7XG4gICAgICAgIHdpZHRoOiAyLjRyZW07XG4gICAgICAgIGhlaWdodDogMi40cmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMjcwcHgpIGFuZCAobWluLWhlaWdodDogMTAwcHgpIHtcbiAgaHRtbCB7XG4gICAgZm9udC1zaXplOiA1cHg7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgLnNvY2lhbCB7XG4gICAgICAuc29jaWFsLWljb24ge1xuICAgICAgICB3aWR0aDogMS40cmVtO1xuICAgICAgICBoZWlnaHQ6IDEuNHJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDE3MHB4KSBhbmQgKG1pbi1oZWlnaHQ6IDEwMHB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMXB4O1xuICB9XG59XG5cbkBrZXlmcmFtZXMgZmFkZUxlZnRUb1JpZ2h0IHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDAuMTtcbiAgICBsZWZ0OiAtMTAlO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuNztcbiAgICBsZWZ0OiAxMjAlO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgZHJvcGluIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0YWRhIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xuICB9XG4gIDEwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSgtNGRlZyk7XG4gIH1cbiAgMjAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlKDRkZWcpO1xuICB9XG4gIDMwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSgtNGRlZyk7XG4gIH1cbiAgNDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlKDRkZWcpO1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSgtNGRlZyk7XG4gIH1cbiAgNjAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlKDRkZWcpO1xuICB9XG4gIDcwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSgtNGRlZyk7XG4gIH1cbiAgODAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlKDRkZWcpO1xuICB9XG4gIDkwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZSgtNGRlZyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKSByb3RhdGUoMGRlZyk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzdHJpcEFuaW1hdGlvbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwcHgpIHJvdGF0ZVooMGRlZyk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSByb3RhdGVaKC0xNmRlZyk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuIiwiJGJnLWNvbG9yOiAjNDA1Y2ExO1xuJGNvbG9yMTogIzhiMDAwMDtcbiRjb2xvcjI6ICMwMDA7XG4kY29sb3IzOiAjODAwMDAwO1xuJGNvbG9yNDogIzhiMDAwMDtcbiR0ZXh0LWNvbG9yOiAjZmZmZmZmO1xuJGJsYWNrOiAjNTU1O1xuJG9mZi13aGl0ZTogI2Y4ZjhmODtcbiR3aGl0ZTogI2ZmZjtcbiRkYXJrOiAjMDAwO1xuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-profile-card',
                templateUrl: './profile-card.component.html',
                styleUrls: ['./profile-card.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, { ExploreMe: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../landing-page/landing-page.component */ "./src/app/landing-page/landing-page.component.ts");
/* harmony import */ var _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../navigator/navigator.component */ "./src/app/navigator/navigator.component.ts");






function ProfileComponent_app_navigator_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-navigator", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cancellation", function ProfileComponent_app_navigator_1_Template_app_navigator_cancellation_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.showNavigationMenu = false; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ProfileComponent {
    constructor() {
        this.showNavigationMenu = false;
    }
    ngOnInit() { }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) { return new (t || ProfileComponent)(); };
ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileComponent, selectors: [["app-profile"]], decls: 3, vars: 2, consts: [[3, "cancellation", 4, "ngIf"], [3, "ExploreMe"], [3, "cancellation"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProfileComponent_app_navigator_1_Template, 1, 0, "app-navigator", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-landing-page", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ExploreMe", function ProfileComponent_Template_app_landing_page_ExploreMe_2_listener() { return ctx.showNavigationMenu = true; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@animate", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showNavigationMenu);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_3__["LandingPageComponent"], _navigator_navigator_component__WEBPACK_IMPORTED_MODULE_4__["NavigatorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyJ9 */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('animate', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], {
                        optional: true
                    })
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-profile',
                templateUrl: './profile.component.html',
                styleUrls: ['./profile.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('animate', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], {
                                optional: true
                            })
                        ])
                    ])
                ]
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/project-card/project-card.component.ts":
/*!********************************************************!*\
  !*** ./src/app/project-card/project-card.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectCardComponent", function() { return ProjectCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _pipes_no_emoji_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pipes/no-emoji.pipe */ "./src/app/pipes/no-emoji.pipe.ts");
/* harmony import */ var _pipes_max_length_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pipes/max-length.pipe */ "./src/app/pipes/max-length.pipe.ts");





const _c0 = function (a0) { return { "card__featured": a0 }; };
class ProjectCardComponent {
    constructor() {
        this.select = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() { }
    onCardClick(project) {
        this.select.emit({ project });
    }
}
ProjectCardComponent.ɵfac = function ProjectCardComponent_Factory(t) { return new (t || ProjectCardComponent)(); };
ProjectCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectCardComponent, selectors: [["app-project-card"]], inputs: { project: "project" }, outputs: { select: "select" }, decls: 21, vars: 13, consts: [[1, "card-outer", 3, "click"], [1, "card", "card__front", 3, "ngClass"], [1, "card-container"], [1, "card-header"], [1, "card-short-details"], [1, "card", "card__back"], [1, "tech-stuff-details"], [1, "full-width-btn"]], template: function ProjectCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProjectCardComponent_Template_div_click_0_listener() { return ctx.onCardClick(ctx.project); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "noEmoji");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Technology: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](18, "maxLength");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "More Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c0, ctx.project.isFeatured));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 5, ctx.project.name));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.project.description, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.project.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](18, 7, ctx.project.techStuff.join(" , "), 100, true));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"]], pipes: [_pipes_no_emoji_pipe__WEBPACK_IMPORTED_MODULE_2__["NoEmojiPipe"], _pipes_max_length_pipe__WEBPACK_IMPORTED_MODULE_3__["MaxLengthPipe"]], styles: ["@charset \"UTF-8\";\n.card-outer[_ngcontent-%COMP%] {\n  position: relative;\n  font-family: \"Lato\", sans-serif;\n  font-weight: normal;\n  color: #555;\n  cursor: pointer;\n}\n.card-outer[_ngcontent-%COMP%]:hover   .card__front[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transform: rotateY(180deg);\n}\n.card-outer[_ngcontent-%COMP%]:hover   .card__back[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transform: rotateY(0deg);\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 20rem;\n  min-height: 18rem;\n  background: #fff;\n  border-radius: 0.6rem;\n  cursor: pointer;\n  overflow: hidden;\n  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);\n  transition: 0.8s ease-in-out;\n  perspective: 15000px;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.card.card__front[_ngcontent-%COMP%] {\n  transform: rotateY(0deg);\n}\n.card.card__back[_ngcontent-%COMP%] {\n  background: #eee;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  transform: rotateY(180deg);\n}\n.card.card__featured[_ngcontent-%COMP%]::before {\n  content: \"\u269D\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  font-size: 1.6rem;\n  padding: 0 0.4rem;\n  color: #fff;\n}\n.card.card__featured[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 3.2rem;\n  height: 3.2rem;\n  background-color: #327e36;\n  transform: rotateZ(45deg) translate(-88%) scale(2);\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 0.6rem 1.6rem;\n  width: 100%;\n  height: 100%;\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  font-family: \"Cormorant Garamond\", serif;\n  width: 100%;\n  font-size: 2.4rem;\n  margin: 1rem 0;\n  font-weight: bold;\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .card-short-details[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: 1;\n  font-size: 1.6rem;\n  margin: 0.6rem 0;\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .tech-stuff-details[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-weight: bold;\n  display: inline-block;\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .tech-stuff-details[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  display: inline;\n  margin-left: 0.3rem;\n  word-break: break-word;\n}\n.card[_ngcontent-%COMP%]   .card-container[_ngcontent-%COMP%]   .full-width-btn[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  background: #8b0000;\n  padding: 0.8rem 0.3rem;\n  line-height: 2;\n  font-size: 1.6rem;\n  color: #fff;\n  border: 0;\n  outline: none;\n  cursor: pointer;\n}\n@keyframes slideIn {\n  0% {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0%);\n    opacity: 1;\n  }\n}\n@media (min-width: 1080px) {\n  .card[_ngcontent-%COMP%] {\n    min-width: 28rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jYXJkL3Byb2plY3QtY2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUtoQjtFQUNFLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBSEY7QUFNSTtFQUNFLGVBQUE7RUFDQSwwQkFBQTtBQUpOO0FBTUk7RUFDRSxlQUFBO0VBQ0Esd0JBQUE7QUFKTjtBQVNBO0VBQ0UsV0FBQTtFQUNBLGdCQXZCVTtFQXdCVixpQkF6Qlc7RUEwQlgsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDJDQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSx5QkFBQTtLQUFBLHNCQUFBO1VBQUEsaUJBQUE7QUFORjtBQVFFO0VBQ0Usd0JBQUE7QUFOSjtBQVNFO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLDBCQUFBO0FBUEo7QUFXSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FBVE47QUFXSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGtEQUFBO0FBVE47QUFhRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBWEo7QUFhSTtFQUNFLHdDQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBWE47QUFjSTtFQUNFLFdBQUE7RUFDQSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVpOO0FBZ0JNO0VBQ0UsaUJBQUE7RUFDQSxxQkFBQTtBQWRSO0FBaUJNO0VBQ0UsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFmUjtBQW1CSTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsbUJDbkhHO0VEb0hILHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQWpCTjtBQXVCQTtFQUNFO0lBQ0UsNEJBQUE7SUFDQSxVQUFBO0VBcEJGO0VBc0JBO0lBQ0UseUJBQUE7SUFDQSxVQUFBO0VBcEJGO0FBQ0Y7QUF1QkE7RUFDRTtJQUNFLGdCQUFBO0VBckJGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0LWNhcmQvcHJvamVjdC1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vdmFyJztcblxuJG1pbi1oZWlnaHQ6IDE4cmVtO1xuJG1pbi13aWR0aDogMjByZW07XG5cbi5jYXJkLW91dGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LWZhbWlseTogJ0xhdG8nLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzU1NTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6aG92ZXIge1xuICAgIC5jYXJkX19mcm9udCB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcbiAgICB9XG4gICAgLmNhcmRfX2JhY2sge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xuICAgIH1cbiAgfVxufVxuXG4uY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4td2lkdGg6ICRtaW4td2lkdGg7XG4gIG1pbi1oZWlnaHQ6ICRtaW4taGVpZ2h0O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiAwLjZyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogNnB4IDZweCAxNXB4IHJnYmEoIzAwMDAwMCwgMC4zKTtcbiAgdHJhbnNpdGlvbjogMC44cyBlYXNlLWluLW91dDtcbiAgcGVyc3BlY3RpdmU6IDE1MDAwcHg7XG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgJi5jYXJkX19mcm9udCB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xuICB9XG5cbiAgJi5jYXJkX19iYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB6LWluZGV4OiAtMTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcbiAgfVxuXG4gICYuY2FyZF9fZmVhdHVyZWQge1xuICAgICY6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiAnXFwyNjlEJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBwYWRkaW5nOiAwIDAuNHJlbTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbiAgICAmOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAzLjJyZW07XG4gICAgICBoZWlnaHQ6IDMuMnJlbTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjdlMzY7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooNDVkZWcpIHRyYW5zbGF0ZSgtODglKSBzY2FsZSgyKTtcbiAgICB9XG4gIH1cblxuICAuY2FyZC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgcGFkZGluZzogMC42cmVtIDEuNnJlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAuY2FyZC1oZWFkZXIge1xuICAgICAgZm9udC1mYW1pbHk6ICdDb3Jtb3JhbnQgR2FyYW1vbmQnLCBzZXJpZjtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZm9udC1zaXplOiAyLjRyZW07XG4gICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5jYXJkLXNob3J0LWRldGFpbHMge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBtYXJnaW46IDAuNnJlbSAwO1xuICAgIH1cblxuICAgIC50ZWNoLXN0dWZmLWRldGFpbHMge1xuICAgICAgJiA+IHNwYW4ge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICAmID4gcCB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAuM3JlbTtcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuZnVsbC13aWR0aC1idG4ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBiYWNrZ3JvdW5kOiAkY29sb3IxO1xuICAgICAgcGFkZGluZzogMC44cmVtIDAuM3JlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyO1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAvLyBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgc2xpZGVJbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxMDgwcHgpIHtcbiAgLmNhcmQge1xuICAgIG1pbi13aWR0aDogMjhyZW07XG4gIH1cbn1cbiIsIiRiZy1jb2xvcjogIzQwNWNhMTtcbiRjb2xvcjE6ICM4YjAwMDA7XG4kY29sb3IyOiAjMDAwO1xuJGNvbG9yMzogIzgwMDAwMDtcbiRjb2xvcjQ6ICM4YjAwMDA7XG4kdGV4dC1jb2xvcjogI2ZmZmZmZjtcbiRibGFjazogIzU1NTtcbiRvZmYtd2hpdGU6ICNmOGY4Zjg7XG4kd2hpdGU6ICNmZmY7XG4kZGFyazogIzAwMDtcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project-card',
                templateUrl: './project-card.component.html',
                styleUrls: ['./project-card.component.scss']
            }]
    }], function () { return []; }, { project: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['project']
        }], select: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['select']
        }] }); })();


/***/ }),

/***/ "./src/app/project-details/project-details.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/project-details/project-details.component.ts ***!
  \**************************************************************/
/*! exports provided: ProjectDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDetailsComponent", function() { return ProjectDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../directives/esc-cancelation.directive */ "./src/app/directives/esc-cancelation.directive.ts");
/* harmony import */ var _ui_cross_icon_cross_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/cross-icon/cross-icon.component */ "./src/app/ui/cross-icon/cross-icon.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function ProjectDetailsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Project Link:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx_r0.project.projectLink, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.project.projectLink);
} }
function ProjectDetailsComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Live Url:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx_r1.project.liveUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.project.liveUrl);
} }
function ProjectDetailsComponent_div_13_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tech_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tech_r6);
} }
function ProjectDetailsComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Technology Used: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProjectDetailsComponent_div_13_li_4_Template, 2, 1, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.project.techStuff);
} }
function ProjectDetailsComponent_div_14_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const features_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](features_r8);
} }
function ProjectDetailsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Features: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProjectDetailsComponent_div_14_li_4_Template, 2, 1, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.project.features);
} }
function ProjectDetailsComponent_div_15_div_1_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _data_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_data_r12);
} }
function ProjectDetailsComponent_div_15_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProjectDetailsComponent_div_15_div_1_li_4_Template, 2, 1, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ad_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ad_r10.title, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ad_r10.data);
} }
function ProjectDetailsComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectDetailsComponent_div_15_div_1_Template, 5, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.project.additionalData);
} }
class ProjectDetailsComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.cancellation = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.renderer.addClass(document.body, 'isSideDrawerOpen');
    }
    onCancellation(e, force = false) {
        const cancelAttribute = force || e.target.attributes.getNamedItem('enable-cancellation');
        if (force || (cancelAttribute && cancelAttribute.value))
            this.cancellation.emit();
        this.renderer.removeClass(document.body, 'isSideDrawerOpen');
    }
}
ProjectDetailsComponent.ɵfac = function ProjectDetailsComponent_Factory(t) { return new (t || ProjectDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"])); };
ProjectDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectDetailsComponent, selectors: [["app-project-details"]], inputs: { project: "project" }, outputs: { cancellation: "cancellation" }, decls: 21, vars: 8, consts: [["enable-cancellation", "true", 1, "project-details-container", 3, "appEscCancelation", "click"], [1, "project-details"], [1, "project-details-header"], [1, "cancellation-icon", 3, "click"], [1, "poject-section", "project-title"], [1, "project-content"], [1, "poject-section", "project-description"], [1, "poject-section", "project-links"], ["class", "project-link", 4, "ngIf"], ["class", "poject-section project-features", 4, "ngIf"], [4, "ngIf"], [1, "astrodivider"], [1, "astrodividermask"], [1, "project-link"], [1, "project-section__header"], ["target", "_blank", 3, "href"], [1, "poject-section", "project-features"], [1, "project-features-details"], [4, "ngFor", "ngForOf"], ["class", "poject-section project-features", 4, "ngFor", "ngForOf"]], template: function ProjectDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("appEscCancelation", function ProjectDetailsComponent_Template_div_appEscCancelation_0_listener() { return ctx.onCancellation(null, true); })("click", function ProjectDetailsComponent_Template_div_click_0_listener($event) { return ctx.onCancellation($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProjectDetailsComponent_Template_div_click_3_listener() { return ctx.onCancellation(null, true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-cross-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ProjectDetailsComponent_div_11_Template, 5, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ProjectDetailsComponent_div_12_Template, 5, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProjectDetailsComponent_div_13_Template, 5, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ProjectDetailsComponent_div_14_Template, 5, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ProjectDetailsComponent_div_15_Template, 2, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "\u2736");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@slideIn", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.project.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.project.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.project.projectLink);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.project.liveUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.project.techStuff && ctx.project.techStuff.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.project.features && ctx.project.features.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.project.additionalData);
    } }, directives: [_directives_esc_cancelation_directive__WEBPACK_IMPORTED_MODULE_2__["EscCancelationDirective"], _ui_cross_icon_cross_icon_component__WEBPACK_IMPORTED_MODULE_3__["CrossIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["@charset \"UTF-8\";\n.project-details-container[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 990;\n  background-color: rgba(0, 0, 0, 0.4);\n  font-family: Helvetica, Arial, sans-serif;\n}\n.project-details-container[_ngcontent-%COMP%]   .poject-section[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n}\n.project-details-container[_ngcontent-%COMP%]   .poject-section[_ngcontent-%COMP%]   .project-section__header[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 2rem;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 75vw;\n  position: relative;\n  margin-left: auto;\n  margin-right: 0;\n  top: 0;\n  right: 0;\n  color: #555;\n  background-color: #f2f2f2;\n  padding: 1.6rem;\n  padding-top: 0;\n  padding-left: 0;\n  z-index: 999;\n  overflow: hidden;\n  overflow-y: auto;\n  box-shadow: -5px 9px 20px rgba(0, 0, 0, 0.3);\n}\n@media (max-width: 640px) {\n  .project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%] {\n    width: 95vw;\n  }\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .project-details-header[_ngcontent-%COMP%] {\n  position: fixed;\n  width: inherit;\n  background-color: inherit;\n  margin-bottom: 1rem;\n  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .project-details-header[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n  font-size: 3.2rem;\n  padding: 1rem;\n  text-align: center;\n  font-family: \"Cormorant Garamond\", serif;\n}\n@media (max-width: 640px) {\n  .project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .project-details-header[_ngcontent-%COMP%]   .project-title[_ngcontent-%COMP%] {\n    text-align: left;\n    font-size: 2.6rem;\n  }\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .project-details-header[_ngcontent-%COMP%]   .cancellation-icon[_ngcontent-%COMP%] {\n  width: 2.6rem;\n  display: inline-block;\n  float: left;\n  top: 0;\n  left: 0;\n  margin: 3.5rem 2.5rem;\n  cursor: pointer;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .astrodivider[_ngcontent-%COMP%] {\n  margin: 64px auto;\n  width: 400px;\n  max-width: 100%;\n  position: relative;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .astrodividermask[_ngcontent-%COMP%] {\n  overflow: hidden;\n  height: 20px;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .astrodividermask[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  margin: -25px auto 0;\n  width: 100%;\n  height: 25px;\n  border-radius: 125px/12px;\n  box-shadow: 0 0 8px #8b0000;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .astrodivider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  bottom: 100%;\n  margin-bottom: -25px;\n  left: 50%;\n  margin-left: -25px;\n  border-radius: 100%;\n  box-shadow: 0 2px 4px #800000;\n  background: #fff;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-details[_ngcontent-%COMP%]   .astrodivider[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  bottom: 4px;\n  left: 4px;\n  right: 4px;\n  border-radius: 100%;\n  border: 1px dashed #800000;\n  text-align: center;\n  line-height: 40px;\n  font-style: normal;\n  color: #8b0000;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%] {\n  width: 80%;\n  margin: auto;\n  margin-top: 12rem;\n  padding-top: 1.5rem;\n  font-size: 1.8rem;\n  letter-spacing: 0.6px;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-description[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-links[_ngcontent-%COMP%] {\n  padding: 1.6rem 0;\n  padding-bottom: 0.5rem;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-links[_ngcontent-%COMP%]   .project-link[_ngcontent-%COMP%] {\n  font-weight: bold;\n  padding: 0.6rem 0;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-links[_ngcontent-%COMP%]   .project-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-weight: normal;\n  color: #405ca1;\n  text-decoration: none;\n  font-style: italic;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-features[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-weight: bold;\n  padding: 0.8rem 0;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-features[_ngcontent-%COMP%]   .project-features-details[_ngcontent-%COMP%] {\n  padding-left: 3rem;\n  list-style-type: none;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-features[_ngcontent-%COMP%]   .project-features-details[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {\n  line-height: 1;\n  line-height: 1.3;\n  padding: 0.4rem 0;\n}\n.project-details-container[_ngcontent-%COMP%]   .project-content[_ngcontent-%COMP%]   .project-features[_ngcontent-%COMP%]   .project-features-details[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]::before {\n  content: \"\u27BA\";\n  padding-right: 0.5em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1kZXRhaWxzL3Byb2plY3QtZGV0YWlscy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX3Zhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUVoQjtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0EseUNBQUE7QUFBRjtBQUVFO0VBQ0UsY0FBQTtBQUFKO0FBRUk7RUFDRSxxQkFBQTtFQUNBLGVBQUE7QUFBTjtBQUlFO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsV0N2Qkk7RUR3QkoseUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLDRDQUFBO0FBRko7QUFJSTtFQWxCRjtJQW1CSSxXQUFBO0VBREo7QUFDRjtBQUdJO0VBQ0UsZUFBQTtFQUVBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7QUFGTjtBQUdNO0VBQ0UsaUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSx3Q0FBQTtBQURSO0FBRVE7RUFMRjtJQU1JLGdCQUFBO0lBQ0EsaUJBQUE7RUFDUjtBQUNGO0FBQ007RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUFDUjtBQUlBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBRkY7QUFLQTtFQUNJLGdCQUFBO0VBQWlCLFlBQUE7QUFGckI7QUFLQTtFQUNNLFdBQUE7RUFDQSxjQUFBO0VBQWUsb0JBQUE7RUFDZixXQUFBO0VBQVksWUFBQTtFQUNWLHlCQUFBO0VBQ0QsMkJBQUE7QUFEUDtBQUdBO0VBQ0ksV0FBQTtFQUFZLFlBQUE7RUFDWixrQkFBQTtFQUNBLFlBQUE7RUFBYSxvQkFBQTtFQUNiLFNBQUE7RUFBVSxrQkFBQTtFQUNWLG1CQUFBO0VBQ0QsNkJBQUE7RUFDQyxnQkFBQTtBQUVKO0FBQUE7RUFDSSxrQkFBQTtFQUNBLFFBQUE7RUFBUyxXQUFBO0VBQ1QsU0FBQTtFQUFVLFVBQUE7RUFDVixtQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0MsY0MzR0k7QUQrR1Q7QUFBRTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7QUFFSjtBQUFJO0VBQ0UsbUJBQUE7QUFFTjtBQUNJO0VBQ0UsaUJBQUE7RUFDQSxzQkFBQTtBQUNOO0FBQU07RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBRVI7QUFEUTtFQUNFLG1CQUFBO0VBQ0EsY0NwSUM7RURxSUQscUJBQUE7RUFDQSxrQkFBQTtBQUdWO0FBR007RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBRFI7QUFHTTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7QUFEUjtBQUdRO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFEVjtBQUdRO0VBQ0UsWUFBQTtFQUNBLG9CQUFBO0FBRFYiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0LWRldGFpbHMvcHJvamVjdC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vdmFyJztcblxuLnByb2plY3QtZGV0YWlscy1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwdnc7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiA5OTA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoIzAwMDAwMCwgMC40KTtcbiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5cbiAgLnBvamVjdC1zZWN0aW9uIHtcbiAgICBtYXJnaW46IDJyZW0gMDtcblxuICAgIC5wcm9qZWN0LXNlY3Rpb25fX2hlYWRlciB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgfVxuICB9XG5cbiAgLnByb2plY3QtZGV0YWlscyB7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogNzV2dztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBjb2xvcjogJGJsYWNrO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG4gICAgcGFkZGluZzogMS42cmVtO1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICB6LWluZGV4OiA5OTk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGJveC1zaGFkb3c6IC01cHggOXB4IDIwcHggcmdiYSgjMDAwMDAwLCAwLjMpO1xuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgICB3aWR0aDogOTV2dztcbiAgICB9XG5cbiAgICAucHJvamVjdC1kZXRhaWxzLWhlYWRlciB7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAvLyBjbGVhcjogYm90aDtcbiAgICAgIHdpZHRoOiBpbmhlcml0O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICBib3gtc2hhZG93OiAwcHggNXB4IDIwcHggcmdiYSgkY29sb3I6ICMwMDAwMDAsICRhbHBoYTogMC4yKTtcbiAgICAgIC5wcm9qZWN0LXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAzLjJyZW07XG4gICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdDb3Jtb3JhbnQgR2FyYW1vbmQnLCBzZXJpZjtcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICBmb250LXNpemU6IDIuNnJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLmNhbmNlbGxhdGlvbi1pY29uIHtcbiAgICAgICAgd2lkdGg6IDIuNnJlbTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBtYXJnaW46IDMuNXJlbSAyLjVyZW07XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICB9XG5cblxuLmFzdHJvZGl2aWRlciB7XG4gIG1hcmdpbjo2NHB4IGF1dG87XG4gIHdpZHRoOjQwMHB4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOnJlbGF0aXZlO1xufVxuXG4uYXN0cm9kaXZpZGVybWFzayB7XG4gICAgb3ZlcmZsb3c6aGlkZGVuOyBoZWlnaHQ6MjBweDtcbn1cblxuLmFzdHJvZGl2aWRlcm1hc2s6YWZ0ZXIge1xuICAgICAgY29udGVudDonJztcbiAgICAgIGRpc3BsYXk6YmxvY2s7IG1hcmdpbjotMjVweCBhdXRvIDA7XG4gICAgICB3aWR0aDoxMDAlOyBoZWlnaHQ6MjVweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czoxMjVweCAvIDEycHg7XG4gICAgICAgYm94LXNoYWRvdzowIDAgOHB4ICRjb2xvcjE7XG59XG4uYXN0cm9kaXZpZGVyIHNwYW4ge1xuICAgIHdpZHRoOjUwcHg7IGhlaWdodDo1MHB4O1xuICAgIHBvc2l0aW9uOmFic29sdXRlO1xuICAgIGJvdHRvbToxMDAlOyBtYXJnaW4tYm90dG9tOi0yNXB4O1xuICAgIGxlZnQ6NTAlOyBtYXJnaW4tbGVmdDotMjVweDtcbiAgICBib3JkZXItcmFkaXVzOjEwMCU7XG4gICBib3gtc2hhZG93OjAgMnB4IDRweCAkY29sb3IzO1xuICAgIGJhY2tncm91bmQ6I2ZmZjtcbn1cbi5hc3Ryb2RpdmlkZXIgaSB7XG4gICAgcG9zaXRpb246YWJzb2x1dGU7XG4gICAgdG9wOjRweDsgYm90dG9tOjRweDtcbiAgICBsZWZ0OjRweDsgcmlnaHQ6NHB4O1xuICAgIGJvcmRlci1yYWRpdXM6MTAwJTtcbiAgICBib3JkZXI6MXB4IGRhc2hlZCAkY29sb3IzO1xuICAgIHRleHQtYWxpZ246Y2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OjQwcHg7XG4gICAgZm9udC1zdHlsZTpub3JtYWw7XG4gICAgIGNvbG9yOiAkY29sb3IxO1xufVxuICB9XG5cbiAgLnByb2plY3QtY29udGVudCB7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMTJyZW07XG4gICAgcGFkZGluZy10b3A6IDEuNXJlbTtcbiAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC42cHg7XG5cbiAgICAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICAgIH1cblxuICAgIC5wcm9qZWN0LWxpbmtzIHtcbiAgICAgIHBhZGRpbmc6IDEuNnJlbSAwO1xuICAgICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcbiAgICAgIC5wcm9qZWN0LWxpbmsge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgcGFkZGluZzogMC42cmVtIDA7XG4gICAgICAgIGEge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgY29sb3I6ICRiZy1jb2xvcjtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnByb2plY3QtZmVhdHVyZXMge1xuICAgICAgaDQge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgcGFkZGluZzogMC44cmVtIDA7XG4gICAgICB9XG4gICAgICAucHJvamVjdC1mZWF0dXJlcy1kZXRhaWxzIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAzcmVtO1xuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5cbiAgICAgICAgJiA+IGxpIHtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNHJlbSAwO1xuICAgICAgICB9XG4gICAgICAgICYgPiBsaTo6YmVmb3JlIHtcbiAgICAgICAgICBjb250ZW50OiAnXFwyN0JBJztcbiAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGJnLWNvbG9yOiAjNDA1Y2ExO1xuJGNvbG9yMTogIzhiMDAwMDtcbiRjb2xvcjI6ICMwMDA7XG4kY29sb3IzOiAjODAwMDAwO1xuJGNvbG9yNDogIzhiMDAwMDtcbiR0ZXh0LWNvbG9yOiAjZmZmZmZmO1xuJGJsYWNrOiAjNTU1O1xuJG9mZi13aGl0ZTogI2Y4ZjhmODtcbiR3aGl0ZTogI2ZmZjtcbiRkYXJrOiAjMDAwO1xuIl19 */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':leave', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        transform: 'translateX(0%)'
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.3s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(0%)',
                            offset: 0
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(100%)',
                            offset: 1
                        })
                    ]))
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':enter', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                        transform: 'translateX(100%)'
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.3s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(100%)',
                            offset: 0
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                            transform: 'translateX(0%)',
                            offset: 1
                        })
                    ]))
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectDetailsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project-details',
                templateUrl: './project-details.component.html',
                styleUrls: ['./project-details.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':leave', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                transform: 'translateX(0%)'
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.3s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                    transform: 'translateX(0%)',
                                    offset: 0
                                }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                    transform: 'translateX(100%)',
                                    offset: 1
                                })
                            ]))
                        ]),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])(':enter', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                transform: 'translateX(100%)'
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.3s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                    transform: 'translateX(100%)',
                                    offset: 0
                                }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                    transform: 'translateX(0%)',
                                    offset: 1
                                })
                            ]))
                        ])
                    ])
                ]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }]; }, { project: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['project']
        }], cancellation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['cancellation']
        }] }); })();


/***/ }),

/***/ "./src/app/projects/projects.component.ts":
/*!************************************************!*\
  !*** ./src/app/projects/projects.component.ts ***!
  \************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _services_tags_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/tags.service */ "./src/app/services/tags.service.ts");
/* harmony import */ var _services_project_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../services/project-data.service */ "./src/app/services/project-data.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../project-card/project-card.component */ "./src/app/project-card/project-card.component.ts");
/* harmony import */ var _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../project-details/project-details.component */ "./src/app/project-details/project-details.component.ts");








function ProjectsComponent_app_project_card_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-project-card", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("select", function ProjectsComponent_app_project_card_1_Template_app_project_card_select_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.onProjectCardClick($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("project", project_r2);
} }
function ProjectsComponent_app_project_details_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-project-details", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cancellation", function ProjectsComponent_app_project_details_3_Template_app_project_details_cancellation_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.selectedProject = null; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("project", ctx_r1.selectedProject);
} }
class ProjectsComponent {
    constructor(tagsService, projectService) {
        this.tagsService = tagsService;
        this.projectService = projectService;
    }
    ngOnInit() {
        // console.log('project component created');
        this.renderProjects();
        this.tagSubscription$ = this.tagsService.onTagUpdate;
        this.tagSubscription$.subscribe(() => {
            if (this.projects.length === 0)
                this.renderProjects();
            else
                this.projects = [];
        });
    }
    ngOnDestroy() {
        // console.log('project component destroyed');
    }
    onProjectCardClick(data) {
        this.selectedProject = data.project;
    }
    renderProjects() {
        this.projects = this.projectService
            .getProjects()
            .filter(project => this.tagsService.tags
            .filter(tag => tag.isSelected)
            .reduce((prev, tag) => prev || project.tags.indexOf(tag.displayName.toLowerCase()) !== -1, false));
    }
}
ProjectsComponent.ɵfac = function ProjectsComponent_Factory(t) { return new (t || ProjectsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_tags_service__WEBPACK_IMPORTED_MODULE_2__["TagsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_project_data_service__WEBPACK_IMPORTED_MODULE_3__["ProjectDataService"])); };
ProjectsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectsComponent, selectors: [["app-projects"]], decls: 4, vars: 4, consts: [[1, "project-container"], ["class", "project-card", 3, "project", "select", 4, "ngFor", "ngForOf"], [3, "project", "cancellation", 4, "ngIf"], [1, "project-card", 3, "project", "select"], [3, "project", "cancellation"]], template: function ProjectsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("@slideIn.done", function ProjectsComponent_Template_div_animation_slideIn_done_0_listener() { return ctx.renderProjects(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectsComponent_app_project_card_1_Template, 1, 1, "app-project-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ProjectsComponent_app_project_details_3_Template, 1, 1, "app-project-details", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@slideIn", ctx.projects == null ? null : ctx.projects.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.projects);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@animateChildren", ctx.selectedProject);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.selectedProject);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_5__["ProjectCardComponent"], _project_details_project_details_component__WEBPACK_IMPORTED_MODULE_6__["ProjectDetailsComponent"]], styles: [".project-container[_ngcontent-%COMP%] {\n  width: 70%;\n  margin: auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  transition: all 0.5s ease-in-out;\n}\n.project-container[_ngcontent-%COMP%]   .project-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n  flex-basis: 33.3%;\n  transition: all 0.5s ease-in-out;\n}\n@media (max-width: 1300px) {\n  .project-container[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n  .project-container[_ngcontent-%COMP%]   .project-card[_ngcontent-%COMP%] {\n    flex-basis: 33.3%;\n  }\n}\n@media (max-width: 970px) {\n  .project-container[_ngcontent-%COMP%] {\n    width: 95%;\n  }\n  .project-container[_ngcontent-%COMP%]   .project-card[_ngcontent-%COMP%] {\n    flex-basis: 50%;\n  }\n}\n@media (max-width: 660px) {\n  .project-container[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n  .project-container[_ngcontent-%COMP%]   .project-card[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBQ0U7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQ0FBQTtBQUNKO0FBR0E7RUFDRTtJQUNFLFVBQUE7RUFBRjtFQUNFO0lBQ0UsaUJBQUE7RUFDSjtBQUNGO0FBR0E7RUFDRTtJQUNFLFVBQUE7RUFERjtFQUVFO0lBQ0UsZUFBQTtFQUFKO0FBQ0Y7QUFJQTtFQUNFO0lBQ0UsVUFBQTtFQUZGO0VBR0U7SUFDRSxnQkFBQTtFQURKO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0cy9wcm9qZWN0cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9qZWN0LWNvbnRhaW5lciB7XG4gIHdpZHRoOiA3MCU7XG4gIG1hcmdpbjogYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluLW91dDtcblxuICAucHJvamVjdC1jYXJkIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGZsZXgtYmFzaXM6IDMzLjMlO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW4tb3V0O1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcbiAgLnByb2plY3QtY29udGFpbmVyIHtcbiAgICB3aWR0aDogOTAlO1xuICAgIC5wcm9qZWN0LWNhcmQge1xuICAgICAgZmxleC1iYXNpczogMzMuMyU7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA5NzBweCkge1xuICAucHJvamVjdC1jb250YWluZXIge1xuICAgIHdpZHRoOiA5NSU7XG4gICAgLnByb2plY3QtY2FyZCB7XG4gICAgICBmbGV4LWJhc2lzOiA1MCU7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA2NjBweCkge1xuICAucHJvamVjdC1jb250YWluZXIge1xuICAgIHdpZHRoOiA5MCU7XG4gICAgLnByb2plY3QtY2FyZCB7XG4gICAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICAgIH1cbiAgfVxufVxuIl19 */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-25%)', opacity: 0 }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', opacity: 1 }), {
                        optional: true
                    }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.05s', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                    transform: 'translateY(-25%)',
                                    opacity: 0,
                                    offset: 0
                                }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', opacity: 1, offset: 1 })
                            ]))
                        ])
                    ], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.05s', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s ease-in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', offset: 0 }),
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-25%)', opacity: 0, offset: 1 })
                            ]))
                        ])
                    ], { optional: true })
                ])
            ]),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('animateChildren', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true })
                ])
            ])
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-projects',
                templateUrl: './projects.component.html',
                styleUrls: ['./projects.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slideIn', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-25%)', opacity: 0 }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', opacity: 1 }), {
                                optional: true
                            }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':enter', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.05s', [
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
                                            transform: 'translateY(-25%)',
                                            opacity: 0,
                                            offset: 0
                                        }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', opacity: 1, offset: 1 })
                                    ]))
                                ])
                            ], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])(':leave', [
                                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["stagger"])('0.05s', [
                                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('0.2s ease-in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["keyframes"])([
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(0%)', offset: 0 }),
                                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-25%)', opacity: 0, offset: 1 })
                                    ]))
                                ])
                            ], { optional: true })
                        ])
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('animateChildren', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', [
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true }),
                            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["query"])('@*, :leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animateChild"])()], { optional: true })
                        ])
                    ])
                ]
            }]
    }], function () { return [{ type: _services_tags_service__WEBPACK_IMPORTED_MODULE_2__["TagsService"] }, { type: _services_project_data_service__WEBPACK_IMPORTED_MODULE_3__["ProjectDataService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/project-data.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/project-data.service.ts ***!
  \**************************************************/
/*! exports provided: ProjectDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectDataService", function() { return ProjectDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _utils_project_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/project-data */ "./src/app/utils/project-data.ts");



class ProjectDataService {
    constructor() { }
    getProjects() {
        return _utils_project_data__WEBPACK_IMPORTED_MODULE_1__["ALL_PROJECT_DATA"];
    }
}
ProjectDataService.ɵfac = function ProjectDataService_Factory(t) { return new (t || ProjectDataService)(); };
ProjectDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProjectDataService, factory: ProjectDataService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/services/skills.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/skills.service.ts ***!
  \********************************************/
/*! exports provided: SkillsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillsService", function() { return SkillsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _utils_data_skills_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/data/skills.data */ "./src/app/utils/data/skills.data.ts");



class SkillsService {
    constructor() { }
    getSkills() {
        return _utils_data_skills_data__WEBPACK_IMPORTED_MODULE_1__["SKILLS_DATA"];
    }
}
SkillsService.ɵfac = function SkillsService_Factory(t) { return new (t || SkillsService)(); };
SkillsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SkillsService, factory: SkillsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SkillsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/services/tags.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/tags.service.ts ***!
  \******************************************/
/*! exports provided: TagsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagsService", function() { return TagsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _utils_tags_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/tags-data */ "./src/app/utils/tags-data.ts");



class TagsService {
    constructor() {
        this.onTagUpdate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.tags = _utils_tags_data__WEBPACK_IMPORTED_MODULE_1__["tagData"];
    }
    toogleTagSelection(tagName) {
        const totalSelection = this.tags.reduce((prev, current) => prev + (current.isSelected ? 1 : 0), 0);
        const selectedSkill = this.tags.find(e => e.displayName === tagName);
        if (totalSelection <= 1 && selectedSkill.isSelected)
            return;
        selectedSkill.isSelected = !selectedSkill.isSelected;
        this.onTagUpdate.emit({
            tags: this.tags.filter(e => e.isSelected)
        });
    }
}
TagsService.ɵfac = function TagsService_Factory(t) { return new (t || TagsService)(); };
TagsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TagsService, factory: TagsService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TagsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/typing/typing.component.ts":
/*!********************************************!*\
  !*** ./src/app/typing/typing.component.ts ***!
  \********************************************/
/*! exports provided: TypingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypingComponent", function() { return TypingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


const _c0 = ["cursor"];
class TypingComponent {
    constructor() {
        this.text = '';
        this.time = 1000;
        this.delay = 500;
        this.displayText = '';
        this.isProcessRunning = false;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (this.text)
            this.startRendering();
    }
    startRendering() {
        this.displayText = '';
        if (!this.isProcessRunning) {
            setTimeout(() => {
                const eachTime = Math.round(this.time / this.text.length);
                const textArr = this.text.split('');
                this.renderTextByLetter(textArr, eachTime);
            }, this.delay);
        }
        this.isProcessRunning = true;
    }
    renderTextByLetter(textArr, timeInterval, letter = textArr[0]) {
        if (!textArr || textArr.length <= 0) {
            const cursor = this.cursorRef.nativeElement;
            cursor.classList.add('cursor__animate');
            this.isProcessRunning = false;
            return;
        }
        setTimeout(() => {
            this.displayText += letter;
            const newTextArr = textArr.slice(1);
            this.renderTextByLetter(newTextArr, timeInterval, newTextArr[0]);
        }, timeInterval);
    }
}
TypingComponent.ɵfac = function TypingComponent_Factory(t) { return new (t || TypingComponent)(); };
TypingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TypingComponent, selectors: [["app-typing"]], viewQuery: function TypingComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.cursorRef = _t.first);
    } }, inputs: { text: "text", time: "time", delay: "delay" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 5, vars: 1, consts: [[1, "text"], [1, "cursor", "cursor__animate"], ["cursor", ""]], template: function TypingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "|");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.displayText, " ");
    } }, styles: [".text[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.cursor[_ngcontent-%COMP%] {\n  content: \"|\";\n  display: inline-block;\n}\n\n.cursor__animate[_ngcontent-%COMP%] {\n  animation: fadeInOut 0.8s cubic-bezier(1, -0.18, 0, 1.35) 0.5s infinite;\n}\n\n@keyframes fadeInOut {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdHlwaW5nL3R5cGluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFFQTtFQUNFLHVFQUFBO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFVBQUE7RUFDRjtFQUNBO0lBQ0UsVUFBQTtFQUNGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC90eXBpbmcvdHlwaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRleHQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5jdXJzb3Ige1xuICBjb250ZW50OiAnfCc7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLmN1cnNvcl9fYW5pbWF0ZSB7XG4gIGFuaW1hdGlvbjogZmFkZUluT3V0IDAuOHMgY3ViaWMtYmV6aWVyKDEsIC0wLjE4LCAwLCAxLjM1KSAwLjVzIGluZmluaXRlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbk91dCB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TypingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-typing',
                templateUrl: './typing.component.html',
                styleUrls: ['./typing.component.scss']
            }]
    }], function () { return []; }, { text: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['text']
        }], time: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['time']
        }], delay: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['delay']
        }], cursorRef: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['cursor']
        }] }); })();


/***/ }),

/***/ "./src/app/ui/back-icon/back-icon.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/ui/back-icon/back-icon.component.ts ***!
  \*****************************************************/
/*! exports provided: BackIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackIconComponent", function() { return BackIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class BackIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
BackIconComponent.ɵfac = function BackIconComponent_Factory(t) { return new (t || BackIconComponent)(); };
BackIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BackIconComponent, selectors: [["app-back-icon"]], decls: 2, vars: 0, consts: [[1, "icon"], ["src", "assets/icons/return.png", "alt", "back icon"]], template: function BackIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".icon[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 25rem;\n  max-height: 25rem;\n  display: inline-block;\n}\n.icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdWkvYmFjay1pY29uL2JhY2staWNvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0FBQ0Y7QUFDRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC91aS9iYWNrLWljb24vYmFjay1pY29uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmljb24ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDI1cmVtO1xuICBtYXgtaGVpZ2h0OiAyNXJlbTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXG4gIGltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BackIconComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-back-icon',
                templateUrl: './back-icon.component.html',
                styleUrls: ['./back-icon.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/ui/cross-icon/cross-icon.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/ui/cross-icon/cross-icon.component.ts ***!
  \*******************************************************/
/*! exports provided: CrossIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrossIconComponent", function() { return CrossIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class CrossIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
CrossIconComponent.ɵfac = function CrossIconComponent_Factory(t) { return new (t || CrossIconComponent)(); };
CrossIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CrossIconComponent, selectors: [["app-cross-icon"]], decls: 2, vars: 0, consts: [[1, "icon"], ["src", "assets/icons/close.png", "alt", "cross icon"]], template: function CrossIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".icon[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 25rem;\n  max-height: 25rem;\n  display: inline-block;\n}\n.icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdWkvY3Jvc3MtaWNvbi9jcm9zcy1pY29uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7QUFDRjtBQUNFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3VpL2Nyb3NzLWljb24vY3Jvc3MtaWNvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pY29uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgbWF4LXdpZHRoOiAyNXJlbTtcbiAgbWF4LWhlaWdodDogMjVyZW07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICBpbWcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CrossIconComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-cross-icon',
                templateUrl: './cross-icon.component.html',
                styleUrls: ['./cross-icon.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/utils/data/automated-space-rover.data.ts":
/*!**********************************************************!*\
  !*** ./src/app/utils/data/automated-space-rover.data.ts ***!
  \**********************************************************/
/*! exports provided: AutomatedSpaceRoverData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomatedSpaceRoverData", function() { return AutomatedSpaceRoverData; });
const AutomatedSpaceRoverData = {
    id: '8d9056cb-e47e-11ea-a204-68ecc5e082cd',
    name: 'Automated Space Rover',
    description: 'Design of Automated Space Rover using FPGA ',
    projectLink: null,
    liveUrl: null,
    isFeatured: false,
    features: [
        'Designed for space application'
    ],
    tags: ['semiconductor'],
    techStuff: ['Xilinx ISE Design', 'FPGA'],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/data/connected-agriculture.data.ts":
/*!**********************************************************!*\
  !*** ./src/app/utils/data/connected-agriculture.data.ts ***!
  \**********************************************************/
/*! exports provided: ConnectedAgricultureData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectedAgricultureData", function() { return ConnectedAgricultureData; });
const ConnectedAgricultureData = {
    id: '390a07ad-e480-11ea-ac53-68ecc5e082cd',
    name: 'Smart farming with EDGE AI and Intelligence Cloud',
    description: 'Combining AI, IoT, and predictive analytics across the agriculture ecosystem in gaining insights into projected yields and potential problems, helping to enable better decisions',
    projectLink: null,
    liveUrl: 'https://suryakantamangaraj.github.io/SmartFarming',
    isFeatured: true,
    features: [
        'Ongoing Project'
    ],
    tags: ['semiconductor', 'ai', 'iot', 'web apps'],
    techStuff: [],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/data/daq-waqm.data.ts":
/*!*********************************************!*\
  !*** ./src/app/utils/data/daq-waqm.data.ts ***!
  \*********************************************/
/*! exports provided: DAQWAQMData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAQWAQMData", function() { return DAQWAQMData; });
const DAQWAQMData = {
    id: 'dc9a7e1b-e47c-11ea-a146-68ecc5e082cd',
    name: 'SoC DAQ for smart water quality monitoring',
    description: 'Design of SoC data acquisition system board for smart water quality monitoring with testability',
    projectLink: null,
    liveUrl: null,
    isFeatured: false,
    features: [
        'Indegenious data acquisition system',
        'Automated System',
        'Low power consumption'
    ],
    tags: ['semiconductor', 'iot', 'automation'],
    techStuff: ['Cadence OrCAD', 'MATLAB', 'LabVIEW', 'T&M Instruments', 'FPGA', 'TSMC 65nm'],
    additionalData: [
        {
            title: 'About',
            data: [
                'This project maintained by e-COE, BBSR with all rights and I have a small contribution to it'
            ]
        }
    ]
};


/***/ }),

/***/ "./src/app/utils/data/geet.data.ts":
/*!*****************************************!*\
  !*** ./src/app/utils/data/geet.data.ts ***!
  \*****************************************/
/*! exports provided: GeetData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeetData", function() { return GeetData; });
const GeetData = {
    id: 'f797eca1-e486-11ea-aa84-68ecc5e082cd',
    name: 'Geet - Music Streaming Platform',
    description: 'Geet is a personalised music streaming platform',
    projectLink: null,
    liveUrl: null,
    isFeatured: false,
    features: [
        'Personalised music streaming',
        'Smart search option'
    ],
    tags: ['web apps'],
    techStuff: ['Python', 'Django', 'CI', 'Bootstrap', 'HTML', 'CSS'],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/data/golem-kit.data.ts":
/*!**********************************************!*\
  !*** ./src/app/utils/data/golem-kit.data.ts ***!
  \**********************************************/
/*! exports provided: GolemKitData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GolemKitData", function() { return GolemKitData; });
const GolemKitData = {
    id: 'a6728e95-e485-11ea-bf1c-68ecc5e082cd',
    name: 'Golem Kit',
    description: 'This is an educational kit',
    projectLink: null,
    liveUrl: null,
    isFeatured: false,
    features: [
        'Designed for educational purpose'
    ],
    tags: ['Semiconductor', 'web apps'],
    techStuff: ['EasyEDA', 'App Inventor'],
    additionalData: [
        {
            title: 'About',
            data: [
                'All copyrights of this project is reserved to Protionix Technology Pvt. Ltd.'
            ]
        }
    ]
};


/***/ }),

/***/ "./src/app/utils/data/ldo-design-smart-power-save.data.ts":
/*!****************************************************************!*\
  !*** ./src/app/utils/data/ldo-design-smart-power-save.data.ts ***!
  \****************************************************************/
/*! exports provided: LDODesignSmartPowerSaveData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LDODesignSmartPowerSaveData", function() { return LDODesignSmartPowerSaveData; });
const LDODesignSmartPowerSaveData = {
    id: '4bf7f593-e478-11ea-a3cb-68ecc5e082cd',
    name: 'LDO Regulator with Smart Power Save Operation',
    description: 'Design of Low Power and High PSRR Low Drop-Out Regulator with Smart Power Save Operation',
    projectLink: null,
    liveUrl: null,
    isFeatured: true,
    features: [
        'smart power save operation',
        'Very high PSRR',
        'very low drop-out minimum voltage',
        'Low power consumption'
    ],
    tags: ['semiconductor'],
    techStuff: ['Cadence Virtuoso', 'UMC 180nm'],
    additionalData: [
        {
            title: 'Accolade',
            data: [
                'Best VLSI Design project (Top 5, UG) in India by Cadence Design Contest - 2018'
            ]
        }
    ]
};


/***/ }),

/***/ "./src/app/utils/data/personal-web.data.ts":
/*!*************************************************!*\
  !*** ./src/app/utils/data/personal-web.data.ts ***!
  \*************************************************/
/*! exports provided: PersonalWebData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalWebData", function() { return PersonalWebData; });
const PersonalWebData = {
    id: '87fbeedb-e436-11ea-9206-68ecc5e082cd',
    name: 'Personal Website ✨',
    description: 'This is my personal website, designed with Adobe XD & developed with Angular 9',
    projectLink: 'https://github.com/suryakantamangaraj/suryakantamangaraj.github.io',
    liveUrl: 'https://suryakantamangaraj.github.io',
    isFeatured: true,
    features: [
        'No 3rd party CSS library or component is used 💖',
        'Filtering Project Cards in Portfolio Page',
        'Angular Animation is used for various transition effects',
        'Reuseable components & Responsive UI',
        'CI/CD to deploy Website'
    ],
    tags: ['web apps'],
    techStuff: ['Angular 9', 'Angular Animation', 'CSS', 'TypeScript', 'HTML', 'Javascript', 'Bootstrap', 'CI'],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/data/project-automation.data.ts":
/*!*******************************************************!*\
  !*** ./src/app/utils/data/project-automation.data.ts ***!
  \*******************************************************/
/*! exports provided: ProjectAutomationData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectAutomationData", function() { return ProjectAutomationData; });
const ProjectAutomationData = {
    id: 'de64e26c-e482-11ea-adfe-68ecc5e082cd',
    name: 'Git and Github Project Automation',
    description: 'This is used for git and github automation, it can do all the necessary things with your repos as you want',
    projectLink: 'https://github.com/suryakantamangaraj/ProjectAutomation',
    liveUrl: null,
    isFeatured: false,
    features: [
        'Automated git localy and globaly',
        'It opens VS Code for coding at desired project location',
        'Windows OS only'
    ],
    tags: ['automation'],
    techStuff: ['Python', 'Shell Scripting'],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/data/skills.data.ts":
/*!*******************************************!*\
  !*** ./src/app/utils/data/skills.data.ts ***!
  \*******************************************/
/*! exports provided: SKILLS_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKILLS_DATA", function() { return SKILLS_DATA; });
const SKILLS_DATA = [
    {
        type: 'EDA Tools',
        names: [
            'Cadence OrCAD', 'Xilinx Vivado', 'MATLAB', 'Cadence Analog Workbench', 'Cadence Virtuoso', 'Altium Designer'
        ]
    },
    {
        type: 'Computer Coding Languages',
        names: [
            'Python', 'C', 'MATLAB', 'Verilog', 'Julia', 'JavaScript', 'TypeScript', 'Shell Scripting'
        ]
    },
    {
        type: 'Automation Tools',
        names: [
            'NI LabVIEW', 'DAQ Systems', 'Selenium'
        ]
    },
    {
        type: 'T&M Tools',
        names: [
            'Spectrum Analyzers', 'Logic Analyzers', 'Digital Meters', 'Safety Testers', 'Signal Generators', 'DSOs', '& Other Tools'
        ]
    },
    {
        type: 'Others',
        names: [
            'Microsoft Office', 'VCS', 'CI/CD', 'Test Management', 'Project Scoping'
        ]
    },
];


/***/ }),

/***/ "./src/app/utils/data/two-stage-classical-opamp.data.ts":
/*!**************************************************************!*\
  !*** ./src/app/utils/data/two-stage-classical-opamp.data.ts ***!
  \**************************************************************/
/*! exports provided: TwoStageClassicalOpAmpData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwoStageClassicalOpAmpData", function() { return TwoStageClassicalOpAmpData; });
const TwoStageClassicalOpAmpData = {
    id: 'e27a7116-e439-11ea-ac3d-68ecc5e082cd',
    name: 'Two Stage Classical Model Op-amp',
    description: 'Design of Two Stage Classical Model Operational Amplifier for LDO Application',
    projectLink: null,
    liveUrl: null,
    isFeatured: true,
    features: [
        'Minimum physical size',
        'Improved slew rate',
        'Low power consumption'
    ],
    tags: ['semiconductor'],
    techStuff: ['Cadence Virtuoso', 'UMC 180nm'],
    additionalData: [
        {
            title: 'Publication',
            data: [
                'Conference Proceedings: IEEE Electron Device Society(National Conference on Devices and Circuits 2018, ISBN: 978-93-83060-16-0)'
            ]
        }
    ]
};


/***/ }),

/***/ "./src/app/utils/data/virtual-assistant.data.ts":
/*!******************************************************!*\
  !*** ./src/app/utils/data/virtual-assistant.data.ts ***!
  \******************************************************/
/*! exports provided: VirtualAssistantData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualAssistantData", function() { return VirtualAssistantData; });
const VirtualAssistantData = {
    id: '54589b78-e488-11ea-904e-68ecc5e082cd',
    name: 'LIMA - Virtual Assistant',
    description: 'LIMA is a personalised virtual assistant',
    projectLink: null,
    liveUrl: null,
    isFeatured: false,
    features: [
        'Voice Activation',
        'Improved Search',
        'Multitasking',
        'Personality and Humor'
    ],
    tags: ['web apps'],
    techStuff: ['Python'],
    additionalData: []
};


/***/ }),

/***/ "./src/app/utils/project-data.ts":
/*!***************************************!*\
  !*** ./src/app/utils/project-data.ts ***!
  \***************************************/
/*! exports provided: ALL_PROJECT_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_PROJECT_DATA", function() { return ALL_PROJECT_DATA; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/app/utils/utils.ts");
/* harmony import */ var _data_personal_web_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/personal-web.data */ "./src/app/utils/data/personal-web.data.ts");
/* harmony import */ var _data_ldo_design_smart_power_save_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/ldo-design-smart-power-save.data */ "./src/app/utils/data/ldo-design-smart-power-save.data.ts");
/* harmony import */ var _data_two_stage_classical_opamp_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/two-stage-classical-opamp.data */ "./src/app/utils/data/two-stage-classical-opamp.data.ts");
/* harmony import */ var _data_project_automation_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/project-automation.data */ "./src/app/utils/data/project-automation.data.ts");
/* harmony import */ var _data_golem_kit_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/golem-kit.data */ "./src/app/utils/data/golem-kit.data.ts");
/* harmony import */ var _data_daq_waqm_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data/daq-waqm.data */ "./src/app/utils/data/daq-waqm.data.ts");
/* harmony import */ var _data_automated_space_rover_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./data/automated-space-rover.data */ "./src/app/utils/data/automated-space-rover.data.ts");
/* harmony import */ var _data_connected_agriculture_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data/connected-agriculture.data */ "./src/app/utils/data/connected-agriculture.data.ts");
/* harmony import */ var _data_geet_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./data/geet.data */ "./src/app/utils/data/geet.data.ts");
/* harmony import */ var _data_virtual_assistant_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./data/virtual-assistant.data */ "./src/app/utils/data/virtual-assistant.data.ts");












const getAllProject = () => {
    const projects = [
        _data_personal_web_data__WEBPACK_IMPORTED_MODULE_2__["PersonalWebData"],
        _data_ldo_design_smart_power_save_data__WEBPACK_IMPORTED_MODULE_3__["LDODesignSmartPowerSaveData"],
        _data_two_stage_classical_opamp_data__WEBPACK_IMPORTED_MODULE_4__["TwoStageClassicalOpAmpData"],
        _data_project_automation_data__WEBPACK_IMPORTED_MODULE_5__["ProjectAutomationData"],
        _data_golem_kit_data__WEBPACK_IMPORTED_MODULE_6__["GolemKitData"],
        _data_daq_waqm_data__WEBPACK_IMPORTED_MODULE_7__["DAQWAQMData"],
        _data_automated_space_rover_data__WEBPACK_IMPORTED_MODULE_8__["AutomatedSpaceRoverData"],
        _data_connected_agriculture_data__WEBPACK_IMPORTED_MODULE_9__["ConnectedAgricultureData"],
        _data_geet_data__WEBPACK_IMPORTED_MODULE_10__["GeetData"],
        _data_virtual_assistant_data__WEBPACK_IMPORTED_MODULE_11__["VirtualAssistantData"],
    ];
    if (!_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production) {
        const result = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["testUniqueness"])(projects, project => project.id);
        if (result.error) {
            const errorLog = [];
            result.duplicates.forEach((project) => {
                errorLog.push(`Duplicate E-id ${project.id} of ${project.name} `);
            });
            throw new Error(JSON.stringify(errorLog));
        }
    }
    return projects;
};
const ALL_PROJECT_DATA = getAllProject();


/***/ }),

/***/ "./src/app/utils/tags-data.ts":
/*!************************************!*\
  !*** ./src/app/utils/tags-data.ts ***!
  \************************************/
/*! exports provided: tagData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagData", function() { return tagData; });
const tagData = [
    { displayName: 'Semiconductor', isSelected: true },
    { displayName: 'Automation', isSelected: true },
    { displayName: 'IoT', isSelected: true },
    { displayName: 'AI', isSelected: true },
    { displayName: 'Web Apps', isSelected: true },
    { displayName: 'Others', isSelected: !true }
];


/***/ }),

/***/ "./src/app/utils/utils.ts":
/*!********************************!*\
  !*** ./src/app/utils/utils.ts ***!
  \********************************/
/*! exports provided: testUniqueness */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testUniqueness", function() { return testUniqueness; });
const testUniqueness = (allData, uKeyFn) => {
    const result = { error: null, duplicates: [] };
    allData.forEach((data, i, alldata) => {
        if (alldata.filter(p => uKeyFn(p) === uKeyFn(data)).length !== 1) {
            result.error = 'Duplicate Key';
            result.duplicates.push(data);
        }
    });
    return result;
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
document.addEventListener('DOMContentLoaded', () => {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]).then(() => {
        // Ensure Angular destroys itself on hot reloads.
        if ('serviceWorker' in navigator && _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => registration.unregister());
            });
            // navigator.serviceWorker.register('/ngsw-worker.js');
        }
        // Otherwise, log the boot error
    }).catch(err => console.log(err));
});


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone-evergreen.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/
// import 'core-js/es6/reflect';
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
// import 'core-js/es7/reflect';
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
//import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/suryakantamangaraj/suryakantamangaraj.github.io/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map