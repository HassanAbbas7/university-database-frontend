import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DegreeCard from "./degreeCard";
import { BASE_URL } from "../constants/constants";

const UniversityCard = ({ name, link, ranking, city, country, summary, id, acedemicStaff, femaleStudents, internationalStudents, mastersScholorships, phdScholorships, bachelorScholorships, students,}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [targetDegree, setTargetDegree] = useState(null);

  useEffect(() => {
    console.log(ranking);
  }, [])
  const handleModalOpen = async (dg) => {
    setShowModal(true);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/${dg}_degrees?oi=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      setModalData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalData(null);
    setError(null);
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        
        <h5 className="card-title">
          <button
            className="btn btn-link text-decoration-none text-primary p-0"
          >
            {name}
          </button>
        </h5>

        {/* City and Country */}
        <p className="card-text mb-1">
          <strong>City:</strong> {city}
        </p>
        <p className="card-text mb-1">
          <strong>Global Ranking:</strong> {ranking}
        </p>
        <p className="card-text mb-1">
          <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAJHqFKyN99n3KXBTsvsn0prNm_H2E94Do&q=${name}%20${country}&zoom=10`} frameborder="0"></iframe>
        </p>
        <p className="card-text mb-3">
          <strong>Country:</strong> {country}
        </p>

        <p className="card-text mb-3">
          <strong>Academic Staff:</strong> {acedemicStaff}
        </p>

        <p className="card-text mb-3">
          <strong>Female Students:</strong> {femaleStudents}
        </p>

        <p className="card-text mb-3">
          <strong>International Students:</strong> {internationalStudents}
        </p>

        <p className="card-text mb-3">
          <strong>Students:</strong> {students}
        </p>

        <p className="card-text mb-3">
          <strong>Masters Scholorships:</strong> {mastersScholorships}
        </p>

        <p className="card-text mb-3">
          <strong>PhD Scholorships:</strong> {phdScholorships}
        </p>

        <p className="card-text mb-3">
          <strong>Bachelor Scholorships:</strong> {bachelorScholorships}
        </p>

        {/* Summary */}
        <p className="card-text text-muted">{summary}</p>
      </div>

      {/* make three Buttons that trigger the modal */}
      <div className="d-flex justify-content-between align-items-center mt-3">
  <button
    className="btn btn-primary mx-1"
    onClick={() => {setTargetDegree("bachelor"); handleModalOpen("bachelor")}}
  >
    View Bachelors
  </button>

  <button
    className="btn btn-primary mx-1"
    onClick={() => {setTargetDegree("master"); handleModalOpen("master")}}
  >
    View Masters
  </button>

  <button
    className="btn btn-primary mx-1"
    onClick={() =>{ setTargetDegree("phd"); handleModalOpen("phd")}}
  >
    View PhD
  </button>
</div>


      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <p>Loading...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {modalData && modalData.map((degree)=> (
            <div>
              <DegreeCard {...degree} degree_={targetDegree}></DegreeCard>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UniversityCard;
