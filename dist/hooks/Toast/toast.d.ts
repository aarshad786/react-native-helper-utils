import { FC } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
export interface ToastOptions {
    /**
     * Id is optional, you may provide an id only if you want to update toast later using toast.update()
     */
    id?: string;
    /**
     * Customize toast icon
     */
    icon?: JSX.Element;
    /**
     * Toast types, You can implement your custom types with JSX using renderType method on ToastContainer.
     */
    type?: "normal" | "success" | "danger" | "warning" | string;
    /**
     * In ms, How long toast will stay before it go away
     */
    duration?: number;
    /**
     * Customize when toast should be placed
     */
    placement?: "top" | "bottom" | "center";
    /**
     * Customize style of toast
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Customize style of toast text
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * Customize how fast toast will show and hide
     */
    animationDuration?: number;
    /**
     * Customize how toast is animated when added or removed
     */
    animationType?: "slide-in" | "zoom-in";
    /**
     * Customize success type icon
     */
    successIcon?: JSX.Element;
    /**
     * Customize danger type icon
     */
    dangerIcon?: JSX.Element;
    /**
     * Customize warning type icon
     */
    warningIcon?: JSX.Element;
    /**
     * Customize success type color. changes toast background color
     */
    successColor?: string;
    /**
     * Customize danger type color. changes toast background color
     */
    dangerColor?: string;
    /**
     * Customize warning type color. changes toast background color
     */
    warningColor?: string;
    /**
     * Customize normal type color. changes toast background color
     */
    normalColor?: string;
    /**
     * Register event for when toast is pressed. If you're using a custom toast you have to pass this to a Touchable.
     */
    onPress?(id: string): void;
    /**
     * Execute event after toast is closed
     */
    onClose?(): void;
    /**
     * Payload data for custom toasts. You can pass whatever you want
     */
    data?: any;
    swipeEnabled?: boolean;
}
export interface ToastProps extends ToastOptions {
    id: string;
    onDestroy(): void;
    message: string | JSX.Element;
    open: boolean;
    renderToast?(toast: ToastProps): JSX.Element;
    renderType?: {
        [type: string]: (toast: ToastProps) => JSX.Element;
    };
    onHide(): void;
}
declare const Toast: FC<ToastProps>;
export default Toast;
