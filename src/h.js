const

	TOKEN_LENGTH = 16,

	PTR_IDENTIFIER = Symbol.for("PTR_IDENTIFIER"),
	HTML_IDENTIFIER = Symbol.for("HTML_IDENTIFIER"),

	createToken = function*(length = TOKEN_LENGTH) {
		for(let i = 0; i < length; i++) {
			yield Math.floor(Math.random() * 26) + 97
		}
	},

	elementTempMap = new WeakMap(),

	df = document.createDocumentFragment(),

	fragmentTemp = {
		[Symbol.toPrimitive](hint) {
			return typeof hint == "string" ? [...this[Symbol.iterator]().map(element => element.outerHTML)].join("") : hint === HTML_IDENTIFIER
		},
		toString() {
			return this[Symbol.toPrimitive]("string")
		}
	},

	refProxyHandler = {
		get(target, prop) {
			const targetValue = target[prop];
			return (
				typeof targetValue == "function" &&
				targetValue.toString().endsWith("() { [native code] }")
			)
				? targetValue.bind(target)
				: targetValue
			;
		}
	},

	h = (s, ...v) => {

		let elementTemp = elementTempMap.get(s);

		if(!elementTemp) {

			let joined = s.join(""), tokenBuf, replacementCounter = 0;
			while(joined.includes(tokenBuf = String.fromCharCode(...createToken()))) {};
			joined = s.join(tokenBuf);

			const
				attrMatch = Array.from(joined.matchAll(new RegExp(`<(?:(!--|\\/[^a-zA-Z])|(\\/?[a-zA-Z][^>\\s]*)|(\\/?$))[\\s].*?${tokenBuf}`, "g")).map(({ 0: { length }, index }) => index + length)),
				placeholder = [],
				node = document.createElement("div")
			;

			df.appendChild(node);

			node.innerHTML = joined.replaceAll(tokenBuf, (_, index) => (placeholder[replacementCounter++] = attrMatch.includes(index + TOKEN_LENGTH)) ? tokenBuf : `<br ${tokenBuf}>` );

			elementTempMap.set(s, elementTemp = [node, placeholder, tokenBuf])
		};

		const
			[node, placeholder, tokenBuf] = elementTemp,
			newNode = node.cloneNode(true),
			id = {}
		;

		newNode.querySelectorAll(`[${tokenBuf}]`).forEach((ref, index) => {

			const vBody = v[index];

			if(placeholder[index]) {
	
				Reflect.ownKeys(vBody).forEach(attrProp => {
	
					const
						attrValue = vBody[attrProp],
						attrPropType = typeof attrProp
					;
	
					if(attrPropType == "symbol") {
	
						const attrPtr = globalThis[attrProp.description.slice(0, 52)]?.(attrProp);
	
						if(!attrPtr?.[Symbol.toPrimitive]?.(PTR_IDENTIFIER)) return;
	
						if(attrValue[Symbol.toPrimitive]?.(PTR_IDENTIFIER)) {
	
							attrValue.watch(newAttrValue => attrPtr.$(newAttrValue, ref))
	
						} else {
	
							attrPtr.$(attrValue, ref)
	
						}
	
					} else if(attrPropType == "string") {
	
						if(attrValue[Symbol.toPrimitive]?.(PTR_IDENTIFIER)) {
	
							if(attrProp == "value" && attrProp in ref) {
	
								const oninput = $ => ref.value = $;
								attrValue.watch(oninput);
	
								ref.addEventListener("input", ({ target: { value } }) => setTimeout(() => {
	
									attrValue.ignore.set(oninput);
									attrValue.$ = value
									attrValue.ignore.delete(oninput);
	
								}), { passive: true })
	
							} else {
	
								attrValue.watch(newAttrValue => ref[attrProp] = newAttrValue)
	
							}
	
						} else if(attrProp == "id" && !(attrValue in id)) {
	
							id[attrValue] = new Proxy(ref, refProxyHandler);
	
						} else {
	
							ref[attrProp] = attrValue;
	
						}
					}
				});
	
			} else {
	
				const primitiveDef = vBody[Symbol.toPrimitive];
	
				if(primitiveDef?.(HTML_IDENTIFIER)) {
	
					ref.replaceWith(...vBody);
	
				} else {
					
					const txt = new Text("")
					ref.replaceWith(txt)
					primitiveDef?.(PTR_IDENTIFIER) ? vBody.watch($ => txt.textContent = $) : txt.textContent = vBody
	
				}
			}
	
			ref.removeAttribute(tokenBuf);
		});

		return Object.assign(

			newNode.childNodes,
			fragmentTemp,
			{
				then(onloadCallbackFn) {
					onloadCallbackFn(id);
					return this;
				}
			}

		);
	}
;

export { h }