import currencySymbol from "currency-symbol";

export const useActions = ({ isUSD, currency, setIsUSD, setValue }) => {
	const symbol = currencySymbol.symbol(isUSD ? "USD" : currency)
		? String.fromCharCode(
				currencySymbol.symbol(isUSD ? "USD" : currency).slice(2, -1)
		  )
		: `${currency} `;

	const onSelectCurrencyType = (event) => {
		const value = event.target.value;
		if (value === "USD") {
			setIsUSD(true);
		} else {
			setIsUSD(false);
		}
	};

	function sliceIntoChunks(arr, chunkSize = 4) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	const formatInput = (value, name) => {
		const lastChar = value.charAt(value.length - 1);
		let withoutLetters = value;

		if (lastChar.toUpperCase() !== lastChar.toLowerCase()) {
			withoutLetters = value.replace(lastChar, "");
		}

		switch (name) {
			case "cardNumber":
				const noSpace = withoutLetters.replaceAll(" ", "");
				let credit = withoutLetters.split("", 19).join("");
				if (noSpace.length <= 16) {
					credit = sliceIntoChunks(noSpace.split(""))
						.map((el) => el.join(""))
						.join(" ");
				}
				setValue(name, credit);
				break;
			case "expDate":
				const noSlash = withoutLetters.replaceAll("/", "");
				let date = withoutLetters.split("", 5).join("");
				if (noSlash.length <= 4) {
					date = sliceIntoChunks(noSlash.split(""), 2)
						.map((el) => el.join(""))
						.join("/");
				}
				setValue(name, date);
				break;
			case "cvv":
				let code = withoutLetters.split("", 3).join("");
				if (withoutLetters.length <= 3) {
					code = withoutLetters;
				}
				setValue(name, code);
				break;
			default:
				setValue(name, withoutLetters);
				break;
		}
	};

	return {
		symbol,
		onSelectCurrencyType,
		formatInput,
	};
};
