import Input from "../input"

let reg = /[а-яА-ЯёЁІі]/g;

export const InputEmail = ({
    label = "E-mail",
    value = '',
    onChange = () => { },
    textError='',
}) => {
    const onHandleChangle = (e) => {
        let val = e.target.value.trim();

        if (val.search(reg) != -1) {
            onChange(val.replace(reg, ''), e);
            return;
        }

        onChange(val, e);
    }

    return (
        <Input
            label={label}
            invalid={(value?.length > 0 && !(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)))}
            name="email"
            value={value}
            readOnly={false}
            valid={/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)}
            onChange={onHandleChangle}
            textError={textError}
        />
    )
}