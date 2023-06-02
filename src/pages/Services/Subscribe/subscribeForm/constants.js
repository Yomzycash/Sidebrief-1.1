import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .max(19, "enter a valid card number")
    .min(19, "enter a valid card number")
    .required(),
  expDate: yup.string().max(5, "enter a complete date").min(5, "enter a complete date").required(),
  cvv: yup.string().max(3, "enter a valid cvv").min(3, "enter a valid cvv").required(),
});

export const subFormElements = [
  {
    id: 1,
    label: "Card number",
    classname: "element1",
    type: "text",
    name: "cardNumber",
    placeholder: "**** **** **** ****",
  },
  {
    id: 2,
    label: "Card expiry date",
    classname: "element2",
    type: "text",
    name: "expDate",
    placeholder: "**/**",
  },
  {
    id: 3,
    label: "Card CVV code",
    classname: "element3",
    type: "text",
    name: "cvv",
    placeholder: "***",
  },
];

export const useCardInput = ({ setValue }) => {
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

  const parseCardInput = (cardInput) => {
    return {
      cardType: "card",
      cardNumber: cardInput.cardNumber.split(" ").join(""),
      cardExMonth: cardInput.expDate.split("/")[0],
      cardExYear: (parseInt(cardInput.expDate.split("/")[1]) + 2000).toString(),
      cardCVC: cardInput.cvv,
    };
  };

  return { formatInput, parseCardInput };
};
