import { doc, runTransaction } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const FormGroup = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

const CashEdit = () => {
  const { id } = useParams();

  const [details, setDetails] = useState({
    accHolderName: "",
    accHolderAddress: "",
    accHolderMobileNo: "",
    accHolderAge: "",
    interestRate: "",
    type: "",
    remarks: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    console.log(details);
    const cashCounterDocRef = doc(db, "counters", "cash-accounts");
    try {
      await runTransaction(db, async (transaction) => {
        const cashCounterDoc = await transaction.get(cashCounterDocRef);
        const newCount = cashCounterDoc.data().count + 1;
        let concat = "00000000" + newCount;
        transaction.set(
          doc(db, "cashaccounts", "CA" + concat.substring(concat.length - 8)),
          details
        );
        transaction.update(cashCounterDocRef, { count: newCount });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5">Update Account</Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  placeholder="Account Number"
                  name="accNumber"
                  value={id}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Name"
                name="accHolderName"
                value={details.accHolderName}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="accHolderAddress"
                value={details.accHolderAddress}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile"
                name="accHolderMobileNo"
                value={details.accHolderMobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="accHolderAge"
                value={details.accHolderAge}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Account
                </Form.Label>
                <Col sm={10}>
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <FormGroup
                label="Remarks"
                placeholder="Remarks"
                name="remarks"
                value={details.remarks}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success" onClick={handleCreate}>
                    Update
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CashEdit;
