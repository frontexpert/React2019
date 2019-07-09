import {observable, action} from "mobx";

class ModalStore {
    @observable ModalProps = {}
    @observable open = false

    @action.bound Modal (props) {
        this.ModalProps = props;
        this.open = true
    }

    @action.bound onClose () {
        this.open = false;
    }

    @action.bound onConfirm () {
        //should call confirm function, then close. No confirm function atm.
        this.open = false;
    }
}

export default () => {
    const store = new ModalStore();
    return store;
};