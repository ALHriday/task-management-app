import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

function MyModalComponent() {
    const { closeModal } = useContext(AuthContext);

    return (
        <div>
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">This is a daisyUI modal in React.</p>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyModalComponent;