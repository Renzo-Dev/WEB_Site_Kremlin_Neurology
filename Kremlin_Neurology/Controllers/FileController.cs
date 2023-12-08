using Microsoft.AspNetCore.Mvc;

namespace Kremlin_Neurology.Controllers;

public class FileController : Controller
{
    // GET
    public IActionResult Download(string fileName)
    {
        // Путь к файлу внутри директории wwwroot
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/FileLibrary", fileName);

        try
        {
            // Проверка наличия файла
            if (!System.IO.File.Exists(filePath)) return NotFound($"Файл не найден. {fileName + filePath}");

            // Определение MIME-типа файла
            var contentType = GetMimeType(fileName);

            // Чтение содержимого файла в байтовый массив
            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            // Отправка файла как потока байтов с указанием типа MIME и имени файла
            return File(fileBytes, contentType, fileName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Произошла ошибка: {ex.Message}");
        }
    }

    // Метод для определения MIME-типа файла на основе его расширения
    private string GetMimeType(string fileName)
    {
        // В данном примере используется простой способ определения MIME-типа,
        // но можно также воспользоваться более продвинутыми способами,
        // например, через регистр Windows или библиотеки, специализированные на определении MIME-типов.

        // Получение расширения файла
        var extension = Path.GetExtension(fileName).ToLowerInvariant();

        switch (extension)
        {
            case ".pdf":
                return "application/pdf";
            case ".zip":
                return "application/zip";
            case ".doc":
                return "application/msword";
            case ".docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case ".txt":
                return "text/plain";
            default:
                return "application/octet-stream";
        }
    }
}