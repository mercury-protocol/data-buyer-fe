import { useToast } from "primevue/usetoast";

class ToastComponent {
  toast;
  constructor() {
    this.toast = useToast();
  }
  addMessage(_severity, _message) {
    this.$toast.add({ severity: _severity, summary: _message });
  }
}

export default ToastComponent;
