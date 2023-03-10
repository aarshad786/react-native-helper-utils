import { Component } from "react";
import { ToastOptions, ToastProps } from "./toast";
export interface Props extends ToastOptions {
    renderToast?(toast: ToastProps): JSX.Element;
    renderType?: {
        [type: string]: (toast: ToastProps) => JSX.Element;
    };
    offset?: number;
    offsetTop?: number;
    offsetBottom?: number;
    swipeEnabled?: boolean;
}
interface State {
    toasts: Array<ToastProps>;
}
declare class ToastContainer extends Component<Props, State> {
    constructor(props: Props);
    static defaultProps: Props;
    /**
     * Shows a new toast. Returns id
     */
    show: (message: string | JSX.Element, toastOptions?: ToastOptions) => string;
    /**
     * Updates a toast, To use this create you must pass an id to show method first, then pass it here to update the toast.
     */
    update: (id: string, message: string | JSX.Element, toastOptions?: ToastOptions) => void;
    /**
     * Removes a toast from stack
     */
    hide: (id: string) => void;
    /**
     * Removes all toasts in stack
     */
    hideAll: () => void;
    /**
     * Check if a toast is currently open
     */
    isOpen: (id: string) => boolean;
    renderBottomToasts(): JSX.Element;
    renderTopToasts(): JSX.Element;
    renderCenterToasts(): JSX.Element | null;
    render(): JSX.Element;
}
export default ToastContainer;
