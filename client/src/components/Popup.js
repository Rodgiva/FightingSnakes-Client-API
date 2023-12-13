import { Modal, Button } from "react-bootstrap";

const Popup = (props) => {
  return (
    <>
      {props.challenger.length !== 0 && (
        <div
          className="modal popup"
          style={{
            display: "block",
            position: "absolute",
            transform: "translate(0%, 25%)",
            height: "100%",
          }}
        >
          <Modal.Dialog
            style={{
              backgroundColor: "#003fbe !important",
              borderRadius: "20px !important",
            }}
          >
            <Modal.Body>
              <p>{`You are challenged by ${props.challenger} !`}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => props.getData(true)}>Accept</Button>
              <Button onClick={() => props.getData(false)}>Refuse</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
};

export default Popup;
