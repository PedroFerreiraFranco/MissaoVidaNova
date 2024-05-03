$(document).ready(function() {
    // Inicializa o contador de ID
    var idCounter = 1;

    // Ao enviar o formulário de adicionar paciente
    $('#addPatientForm').submit(function(event) {
        // Evita que a página seja recarregada
        event.preventDefault();

        // Verifica se o formulário é válido
        if ($(this)[0].checkValidity()) {
            // Obtem os valores dos campos do formulário
            var id = idCounter++; // Incrementa o contador e atribui o valor a ID
            var name = $('#patientName').val();
            var age = $('#patientAge').val();
            var cpf = $('#patientCPF').val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
            var rg = $('#patientRG').val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do RG
            var city = $('#patientCity').val();
            var status = $('#patientStatus').val();
            var observation = $('#patientObservation').val();
            var photoFile = $('#patientPhoto')[0].files[0]; // Captura o arquivo de imagem
            var photo = ''; // Inicializa a variável da foto

            // Verifica se foi enviado um arquivo de imagem
            if (photoFile) {
                // Cria um leitor de arquivo
                var reader = new FileReader();
                // Define a função de callback para quando o arquivo for lido
                reader.onload = function(event) {
                    // Define a foto como a representação base64 do arquivo de imagem
                    photo = event.target.result;

                    // Adiciona uma nova linha na tabela com os dados do paciente e botões de ação
                    var newRow = '<tr><td>' + id + '</td><td><img src="' + photo + '" alt="Foto do paciente" style="width: 100px; height: 100px; border-radius: 50%;"></td><td>' + name + '</td><td>' + age + '</td><td>' + formatarCPF(cpf) + '</td><td>' + formatarRG(rg) + '</td><td>' + city + '</td><td>' + status + '</td><td>' + observation + '</td><td><button class="btn btn-danger btn-sm delete-btn">Excluir</button> <button class="btn btn-primary btn-sm edit-btn">Editar</button></td></tr>';

                    // Adiciona a nova linha ao corpo da tabela
                    $('#patientTable tbody').append(newRow);

                    // Limpa os campos do formulário para a próxima entrada
                    $('#patientName').val('');
                    $('#patientAge').val('');
                    $('#patientCPF').val('');
                    $('#patientRG').val('');
                    $('#patientCity').val('');
                    $('#patientStatus').val('aguardo');
                    $('#patientObservation').val('');
                    $('#patientPhoto').val('');

                    // Fecha o modal
                    $('#addPatientModal').modal('hide');

                    // Remove a classe 'was-validated' do formulário
                    $(this).removeClass('was-validated');
                };
                // Lê o arquivo de imagem como uma URL de dados (base64)
                reader.readAsDataURL(photoFile);
            } else {
                // Se nenhum arquivo de imagem foi selecionado, define a foto como uma string vazia
                photo = '';

                // Adiciona uma nova linha na tabela com os dados do paciente e botões de ação
                var newRow = '<tr><td>' + id + '</td><td><img src="' + photo + '" alt="Foto do paciente" style="width: 100px; height: 100px; border-radius: 50%;"></td><td>' + name + '</td><td>' + age + '</td><td>' + formatarCPF(cpf) + '</td><td>' + formatarRG(rg) + '</td><td>' + city + '</td><td>' + status + '</td><td>' + observation + '</td><td><button class="btn btn-danger btn-sm delete-btn">Excluir</button> <button class="btn btn-primary btn-sm edit-btn">Editar</button></td></tr>';

                // Adiciona a nova linha ao corpo da tabela
                $('#patientTable tbody').append(newRow);

                // Limpa os campos do formulário para a próxima entrada
                $('#patientName').val('');
                $('#patientAge').val('');
                $('#patientCPF').val('');
                $('#patientRG').val('');
                $('#patientCity').val('');
                $('#patientStatus').val('aguardo');
                $('#patientObservation').val('');
                $('#patientPhoto').val('');

                // Fecha o modal
                $('#addPatientModal').modal('hide');

                // Remove a classe 'was-validated' do formulário
                $(this).removeClass('was-validated');
            }
        } else {
            // Se o formulário não for válido, marque os campos inválidos
            $(this).addClass('was-validated');
        }
    });

    // Ao clicar no botão "Excluir"
    $(document).on('click', '.delete-btn', function() {
        if (confirm("Tem certeza que deseja excluir este paciente?")) {
            $(this).closest('tr').remove(); // Remove a linha da tabela
            // Aqui você pode adicionar lógica adicional, como enviar uma solicitação para excluir o paciente do banco de dados
        }
    });

    // Ao clicar no botão "Editar"
    $(document).on('click', '.edit-btn', function() {
        var row = $(this).closest('tr'); // Obtém a linha da tabela
        var id = row.find('td:eq(0)').text(); // Obtém o ID do paciente
        var name = row.find('td:eq(2)').text(); // Obtém o nome do paciente
        var age = row.find('td:eq(3)').text(); // Obtém a idade do paciente
        var cpf = row.find('td:eq(4)').text().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
        var rg = row.find('td:eq(5)').text().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do RG
        var city = row.find('td:eq(6)').text(); // Obtém a cidade do paciente
        var status = row.find('td:eq(7)').text(); // Obtém o status do paciente
        var observation = row.find('td:eq(8)').text(); // Obtém a observação do paciente

        // Preenche os campos do modal de edição com os dados do paciente selecionado
        $('#editPatientModal #editPatientID').val(id);
        $('#editPatientModal #editPatientName').val(name);
        $('#editPatientModal #editPatientAge').val(age);
        $('#editPatientModal #editPatientCPF').val(formatarCPF(cpf));
        $('#editPatientModal #editPatientRG').val(formatarRG(rg));
        $('#editPatientModal #editPatientCity').val(city);
        $('#editPatientModal #editPatientStatus').val(status);
        $('#editPatientModal #editPatientObservation').val(observation);

        // Exibe o modal de edição
        $('#editPatientModal').modal('show');
    });

    // Ao enviar o formulário de edição de paciente
    $('#editPatientForm').submit(function(event) {
        // Evita que a página seja recarregada
        event.preventDefault();

        // Aqui você pode implementar a lógica para atualizar os dados do paciente no banco de dados
        // Por exemplo:
        var id = $('#editPatientID').val();
        var name = $('#editPatientName').val();
        var age = $('#editPatientAge').val();
        var cpf = $('#editPatientCPF').val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
        var rg = $('#editPatientRG').val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos do RG
        var city = $('#editPatientCity').val();
        var status = $('#editPatientStatus').val();
        var observation = $('#editPatientObservation').val();

        // Atualiza os dados do paciente na tabela
        var row = $('#patientTable').find('tr').filter(function() {
            return $(this).find('td:eq(0)').text() == id;
        });

        row.find('td:eq(2)').text(name);
        row.find('td:eq(3)').text(age);
        row.find('td:eq(4)').text(formatarCPF(cpf));
        row.find('td:eq(5)').text(formatarRG(rg));
        row.find('td:eq(6)').text(city);
        row.find('td:eq(7)').text(status);
        row.find('td:eq(8)').text(observation);

        // Fecha o modal de edição
        $('#editPatientModal').modal('hide');
    });

    // Função para formatar CPF (exemplo: 12345678909 -> 123.456.789-09)
    function formatarCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Função para formatar RG (exemplo: 12345678 -> 12.345.678)
    function formatarRG(rg) {
        return rg.replace(/(\d{2,3})(\d{3})(\d{3})/, '$1.$2.$3');
    }

    // Adiciona a validação dos campos de idade para não permitir números negativos
    $('#patientAge').on('input', function() {
        var age = $(this).val();
        if (age < 0) {
            $(this).val('');
        }
    });

    // Adiciona a validação para não permitir números nos campos de nome e cidade
    $('#patientName, #patientCity').on('input', function() {
        var value = $(this).val();
        $(this).val(value.replace(/[0-9]/g, ''));
    });

    // Adiciona a máscara de CPF
    $('#patientCPF').mask('000.000.000-00');

    // Adiciona a máscara de RG
    $('#patientRG').mask('00.000.000');
});
