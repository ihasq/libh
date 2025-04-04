import { $ } from "./$.js"

let registeredEvent = "";

const
	handlerCache = {},
	bundled = $((callbacks, ref) => Object.keys(callbacks).forEach(event => ref.addEventListener(event, callbacks[event], { passive: !0 }))),
	targetMap = new WeakMap(),
	bundledPublishFn = () => bundled.publish(),
	on = new Proxy({}, {
		get(_, eventName) {
			return eventName === Symbol.toPrimitive
			? bundledPublishFn
			: eventName === "$"
			? bundledPublishFn()
			: (handlerCache[eventName] ||= $((callbackFn, ref) => {
				if(!(registeredEvent.includes(eventName))) {
					globalThis.addEventListener(eventName, e => targetMap.get(e.target)?.[eventName]?.forEach?.(x => x(e)), { passive: !0 })
					registeredEvent += eventName + "\0"
				}
				if(typeof callbackFn == "object") {
					const callbackFnBody = callbackFn.fn;
					callbackFn = callbackFnBody;
				};
				if(!targetMap.has(ref)) targetMap.set(ref, {});
				(targetMap.get(ref)[eventName] ||= []).push(callbackFn)
			}, undefined, { name: "on." + eventName })).publish()
		}
	})
;

export { on }