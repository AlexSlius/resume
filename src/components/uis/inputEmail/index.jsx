import Input from "../input"

let reg = /[а-яА-ЯёЁІі]/g;

export const InputEmail = ({
    label = "E-mail",
    value = '',
    onChange = () => { },
    textError='',
}) => {
    const onHandleChangle = (e) => {
        let val = e.target.value;

        if (val.search(reg) != -1) {
            onChange(val.replace(reg, ''), e);
            return;
        }

        onChange(val, e);
    }

    return (
        <Input
            label={label}
            invalid={(value?.length > 0 && !(/\S+@\S+\.\S+/.test(value)))}
            value={value}
            readOnly={false}
            valid={/\S+@\S+\.\S+/.test(value)}
            onChange={onHandleChangle}
            textError={textError}
        />
    )
}