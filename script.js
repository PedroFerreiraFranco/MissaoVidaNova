$(document).ready(function() {
    // Inicializa o contador de ID
    var idCounter = 1;

    // Ao enviar o formulário de adicionar funcionário
    $('#addEmployeeForm').submit(function(event) {
        // Evita que a página seja recarregada
        event.preventDefault();

        // Verifica se o formulário é válido
        if ($(this)[0].checkValidity()) {
            // Obtem os valores dos campos do formulário
            var id = idCounter++; // Incrementa o contador e atribui o valor a ID
            var name = $('#employeeName').val();
            var position = $('#employeePosition').val();
            var salary = parseFloat($('#employeeSalary').val()).toFixed(2); // Convertendo para número decimal com duas casas decimais

            // Cria uma nova linha na tabela com os dados do funcionário e os botões de editar e excluir
            var newRow = '<tr><td>' + id + '</td><td>' + name + '</td><td>' + position + '</td><td>R$ ' + salary + '</td><td><button class="btn btn-primary btn-sm edit-btn">Editar</button> <button class="btn btn-danger btn-sm remove-btn">Excluir</button></td></tr>';
            
            // Adiciona a nova linha ao corpo da tabela
            $('#employeeTable tbody').append(newRow);

            // Fecha o modal
            $('#addEmployeeModal').modal('hide');

            // Limpa os campos do formulário para a próxima entrada
            $('#employeeName').val('');
            $('#employeePosition').val('');
            $('#employeeSalary').val('');

            // Remove a classe 'was-validated' do formulário
            $(this).removeClass('was-validated');
        } else {
            // Se o formulário não for válido, marque os campos inválidos
            $(this).addClass('was-validated');
        }
    });

    // Ao clicar no botão "Editar" na tabela de funcionários
$('#employeeTable').on('click', '.edit-btn', function() {
    // Obtém os dados da linha atual
    var $row = $(this).closest('tr');
    var id = $row.find('td:eq(0)').text();
    var name = $row.find('td:eq(1)').text();
    var position = $row.find('td:eq(2)').text();
    var salary = $row.find('td:eq(3)').text().replace('R$ ', ''); // Remove o 'R$ ' do salário
    
    // Preenche os campos do modal de edição com os dados do funcionário
    $('#editEmployeeModal #editEmployeeId').val(id);
    $('#editEmployeeModal #editEmployeeName').val(name);
    $('#editEmployeeModal #editEmployeePosition').val(position);
    $('#editEmployeeModal #editEmployeeSalary').val(salary);

    // Abre o modal de edição
    $('#editEmployeeModal').modal('show');
});

// Ao enviar o formulário de editar funcionário
$('#editEmployeeForm').submit(function(event) {
    // Evita que a página seja recarregada
    event.preventDefault();

    // Obtem os valores dos campos do formulário
    var id = $('#editEmployeeId').val();
    var name = $('#editEmployeeName').val();
    var position = $('#editEmployeePosition').val();
    var salary = parseFloat($('#editEmployeeSalary').val()).toFixed(2); // Convertendo para número decimal com duas casas decimais
    
    // Atualiza os dados na tabela
    $('#employeeTable tbody').find('tr:eq(' + (id - 1) + ')').find('td:eq(1)').text(name);
    $('#employeeTable tbody').find('tr:eq(' + (id - 1) + ')').find('td:eq(2)').text(position);
    $('#employeeTable tbody').find('tr:eq(' + (id - 1) + ')').find('td:eq(3)').text('R$ ' + salary);

    // Fecha o modal
    $('#editEmployeeModal').modal('hide');
});

    // Ao clicar no botão "Excluir" na tabela de funcionários
    $('#employeeTable').on('click', '.remove-btn', function() {
        // Remove a linha da tabela ao qual o botão "Excluir" pertence
        $(this).closest('tr').remove();
    });
});
