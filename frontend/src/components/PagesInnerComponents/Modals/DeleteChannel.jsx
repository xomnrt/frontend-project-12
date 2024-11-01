import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal"
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { ChatApiContext } from "../../../contexts/ChatApiProvider";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectCurrentChannelId } from "../../../slices/channelsSlice";

const DeleteChannelForm = ({handleClose, channel}) => {
  const dispatch = useDispatch()

  const currentChannelId = useSelector(selectCurrentChannelId)

  const chatContext = useContext(ChatApiContext);

  const deleteChannel = () => {
    chatContext.deleteChannel(channel);
    if (currentChannelId === channel.id) {
      dispatch(actions.setCurrentChannelId(1));
    }
    handleClose();
  }

      return (
        <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                            <Stack gap={1} >
                                <h4 className="text-center mt-1 mb-3">Вы уверены?</h4>
                                <div className="mx-auto mb-3 mt-3">
                                    <Button variant="success" type="submit" className="btn-lg mx-2" onClick={deleteChannel}>Подтвердить</Button>
                                    <Button variant="danger" type="submit" className="btn-lg mx-2" onClick={handleClose}>Отмена</Button>
                                </div>
                            </Stack>
            </div>
        </Row>
    </Container>
      );
}

 const DeleteChannelModal = (props) => {

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <DeleteChannelForm handleClose={props.handleClose} channel={props.channel}></DeleteChannelForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.handleClose}>Закрыть</Button>
        </Modal.Footer>
      </>

    );
}

export default DeleteChannelModal;
