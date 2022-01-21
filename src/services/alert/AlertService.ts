import Swal, { SweetAlertOptions } from 'sweetalert2'
import Snackbar from 'node-snackbar'

export default class AlertService {
  static success(params: { text?: string; timer?: number }) {
    const opts: SweetAlertOptions = {
      text: '',
      icon: 'success',
      showCloseButton: false,
      showCancelButton: false,
      ...params,
    }

    Swal.fire(opts)
  }

  static error(params: { text?: string; timer?: number }) {
    const opts: SweetAlertOptions = {
      text: '',
      icon: 'error',
      showCloseButton: false,
      showCancelButton: false,
      ...params,
    }

    Swal.fire(opts)
  }

  static closeAlert() {
    Swal.close()
  }

  static snackbar(config: SnackbarOptions) {
    Snackbar.show(config)
  }

  static confirm(params: {
    text?: string
    title?: string
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    timer?: number
  }): Promise<boolean> {
    const opts: SweetAlertOptions = {
      text: '',
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      ...params,
    }
    return new Promise<boolean>(res => {
      Swal.fire(opts).then(result => {
        res(result.value)
      })
    })
  }
}
