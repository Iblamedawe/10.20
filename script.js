const MET = 7.7;
    let runs = JSON.parse(localStorage.getItem('runs')) || [];

    const runForm = document.getElementById('runForm');
    const runTable = document.getElementById('runTable');

    function save() {
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    function render() {
      runTable.innerHTML = '';
      runs.forEach((r, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.date}</td>
          <td>${r.duration}</td>
          <td>${r.distance}</td>
          <td>${r.speed.toFixed(1)}</td>
          <td>${r.calories.toFixed(0)}</td>
          <td>
            <button onclick="editRun(${i})">Szerk.</button>
            <button onclick="deleteRun(${i})">Töröl</button>
          </td>`;
        runTable.appendChild(tr);
      });
    }


    runForm.onsubmit = e => {
      e.preventDefault();
      const duration = parseFloat(document.getElementById('duration').value);
      const distance = parseFloat(document.getElementById('distance').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const speed = distance / (duration / 60);
      const calories = MET * weight * (duration / 60);
      const date = new Date().toLocaleDateString('hu-HU');
      runs.push({ date, duration, distance, speed, calories });
      save();
      render();
      runForm.reset();
    };

    function deleteRun(i) {
      runs.splice(i, 1);
      save();
      render();
    }

    function editRun(i) {
      const r = runs[i];
      document.getElementById('duration').value = r.duration;
      document.getElementById('distance').value = r.distance;
      document.getElementById('weight').value = (r.calories / (MET * (r.duration / 60))).toFixed(1);
      deleteRun(i);
    }

    render();
//V1.0