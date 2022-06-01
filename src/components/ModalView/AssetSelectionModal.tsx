import Modal from "./Modal";

export default function AssetSelectionModal({ isOpen, closeModal }) {

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            action={<button onClick={closeModal}>Add</button>}
            children={<p>Modal body</p>}
            title="Add Asset"
        />
    )
}