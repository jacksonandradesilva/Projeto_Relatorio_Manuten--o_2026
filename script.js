const teamBody = document.getElementById('equipe-body');
const addTeamRowButton = document.getElementById('add-team-row');

const statusClassMap = {
    '': 'status-empty',
    atestado: 'status-atestado',
    presente: 'status-presente',
    ferias: 'status-ferias',
    ausente: 'status-ausente'
};

function applyStatusClass(selectElement) {
    Object.values(statusClassMap).forEach((className) => {
        selectElement.classList.remove(className);
    });

    selectElement.classList.add(statusClassMap[selectElement.value]);
}

function createTeamRow() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Nome do membro"></td>
        <td><input type="text" placeholder="Matrícula"></td>
        <td><input type="text" placeholder="Horário"></td>
        <td>
            <select class="status-select" aria-label="Status do membro">
                <option value="">Opcional</option>
                <option value="atestado">Atestado</option>
                <option value="presente">Presente</option>
                <option value="ferias">Férias</option>
                <option value="ausente">Ausente</option>
            </select>
        </td>
        <td class="action-column"><button type="button" class="remove-row">Remover</button></td>
    `;

    const statusSelect = row.querySelector('.status-select');
    applyStatusClass(statusSelect);
    statusSelect.addEventListener('change', () => applyStatusClass(statusSelect));

    return row;
}

teamBody.querySelectorAll('.status-select').forEach((statusSelect) => {
    applyStatusClass(statusSelect);
    statusSelect.addEventListener('change', () => applyStatusClass(statusSelect));
});

addTeamRowButton.addEventListener('click', () => {
    teamBody.appendChild(createTeamRow());
});

teamBody.addEventListener('click', (event) => {
    const removeButton = event.target.closest('.remove-row');
    if (!removeButton) {
        return;
    }

    const row = removeButton.closest('tr');
    if (row && teamBody.children.length > 1) {
        row.remove();
    }
});
