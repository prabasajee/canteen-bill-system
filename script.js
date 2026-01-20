(function () {
  const form = document.getElementById('splitForm');
  const totalAmountEl = document.getElementById('totalAmount');
  const peopleEl = document.getElementById('numberOfPeople');
  const tipEl = document.getElementById('tipPercentage');

  const totalErr = document.getElementById('totalAmountError');
  const peopleErr = document.getElementById('numberOfPeopleError');
  const tipErr = document.getElementById('tipPercentageError');

  const result = document.getElementById('result');
  const perPersonAmount = document.getElementById('perPersonAmount');
  const totalWithTip = document.getElementById('totalWithTip');
  const peopleCount = document.getElementById('peopleCount');
  const tipApplied = document.getElementById('tipApplied');

  function clearErrors() {
    totalErr.textContent = '';
    peopleErr.textContent = '';
    tipErr.textContent = '';
  }

  function setError(el, msg) {
    el.textContent = msg;
  }

  function formatMoney(n) {
    if (!isFinite(n)) return '—';
    return Number(n).toFixed(2);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const totalRaw = totalAmountEl.value.trim();
    const peopleRaw = peopleEl.value.trim();
    const tipRaw = tipEl.value.trim();

    const total = parseFloat(totalRaw);
    const people = parseInt(peopleRaw, 10);
    const tipPct = tipRaw === '' ? 0 : parseFloat(tipRaw);

    let valid = true;

    if (isNaN(total) || total <= 0) {
      setError(totalErr, 'Please enter a total amount greater than 0.');
      valid = false;
    }

    if (!Number.isInteger(people) || people < 1) {
      setError(peopleErr, 'Number of people must be 1 or more.');
      valid = false;
    }

    if (isNaN(tipPct) || tipPct < 0) {
      setError(tipErr, 'Tip must be 0 or more (or leave blank).');
      valid = false;
    }

    if (!valid) {
      result.classList.add('hidden');
      return;
    }

    const tipMultiplier = 1 + (tipPct / 100);
    const totalWithTipVal = total * tipMultiplier;
    const perPerson = totalWithTipVal / people;

    perPersonAmount.textContent = formatMoney(perPerson);
    totalWithTip.textContent = formatMoney(totalWithTipVal);
    peopleCount.textContent = String(people);
    tipApplied.textContent = tipPct ? (tipPct + '%') : 'No tip';

    result.classList.remove('hidden');
    perPersonAmount.focus?.();
  });

  form.addEventListener('reset', function () {
    clearErrors();
    result.classList.add('hidden');
    perPersonAmount.textContent = '—';
    totalWithTip.textContent = '—';
    peopleCount.textContent = '—';
    tipApplied.textContent = '—';
  });
})();
