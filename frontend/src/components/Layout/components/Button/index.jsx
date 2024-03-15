import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    className,
    leftIcon,
    rightIcon,
    primary = false,
    outline = false,
    text = false,
    table = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };

    //Remove event listener
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    const clasess = cx("wrapper", {
        [className]: className,
        primary,
        outline,
        text,
        table,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Comp className={clasess} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
