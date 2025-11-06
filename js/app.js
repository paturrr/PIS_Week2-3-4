document.addEventListener("DOMContentLoaded", () => {
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    if (button.classList.contains("form-submit")) {
      return;
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Hubungi QA Lead untuk sesi tindak lanjut.");
    });
  });

  const manualTestForm = document.getElementById("manual-test-form");
  const testResultBox = document.getElementById("manual-test-result");

  if (!manualTestForm || !testResultBox) {
    return;
  }

  manualTestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(manualTestForm);
    const ageValue = Number(formData.get("age"));
    const incomeValue = Number(formData.get("income"));
    const age = Number.isFinite(ageValue) ? ageValue : 0;
    const income = Number.isFinite(incomeValue) ? incomeValue : 0;
    const hasActiveCard = formData.get("activeCard") === "yes";
    const creditHistory = formData.get("creditHistory");

    const failureReasons = [];

    if (creditHistory === "buruk") {
      failureReasons.push("Riwayat kredit buruk memicu penolakan otomatis.");
    }

    if (age < 21) {
      failureReasons.push("Usia pemohon di bawah 21 tahun.");
    }

    if (income < 5000000) {
      failureReasons.push("Penghasilan bulanan kurang dari Rp5.000.000.");
    }

    if (hasActiveCard) {
      failureReasons.push("Pemohon masih memiliki kartu kredit BankSejahtera yang aktif.");
    }

    testResultBox.classList.remove("test-result--approved", "test-result--rejected");

    if (failureReasons.length === 0) {
      testResultBox.classList.add("test-result--approved");
      testResultBox.innerHTML = `
        <strong>Pengajuan Disetujui</strong>
        <p>Semua kriteria formal terpenuhi dan tidak ada aturan penolakan mutlak yang dilanggar.</p>
      `;
    } else {
      const reasonItems = failureReasons
        .map((reason) => `<li>${reason}</li>`)
        .join("");

      testResultBox.classList.add("test-result--rejected");
      testResultBox.innerHTML = `
        <strong>Pengajuan Ditolak</strong>
        <p>Berikut alasan keputusan:</p>
        <ul>${reasonItems}</ul>
      `;
    }
  });
});
