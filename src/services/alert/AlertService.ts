import Swal from 'sweetalert2';
import Snackbar from "node-snackbar";


export default class AlertService {
    static success(text: string) {
        Swal.fire({
            text: text,
            icon: "success"
        });
    }

    static error(text: string, onClose: Function = () => {
    }) {
        Swal.fire({
            text: text,
            icon: "error",
            // onClose: (popup: HTMLElement) {
            //     onClose(popup);
            // }
        });
    }

    static snackbar(config: SnackbarOptions) {
        Snackbar.show(config);
    }

    static confirm(text: string, title: string = 'Are you sure?'): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            Swal.fire({
                title: title,
                text: text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                res(result.value);
            });
        });
    }
}
