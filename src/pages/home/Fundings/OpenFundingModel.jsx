const OpenFundingModel = ({ openRef, handleOpenModal, handleCloseModal }) => {
  return (
    <dialog ref={openRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Confirm Your Donation</h3>

        {/* Donor Info */}
        {/*     <div className="space-y-3">
          <input
            type="text"
            value={userInfo?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            value={userInfo?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div> */}
        <h1>hell</h1>

        {/* Modal Actions */}
        <div className="modal-action flex justify-between">
         {/*  <button onClick={handleConfirmDonation} className="btn btn-success">
            Confirm
          </button> */}
          <button onClick={handleCloseModal} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default OpenFundingModel;
