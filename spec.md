# VehicleCare — Đặc tả yêu cầu phần mềm

| Thuộc tính | Giá trị |
|---|---|
| Đề tài | Web app quản lý chi phí sử dụng và nhắc lịch bảo dưỡng xe máy, ô tô |
| Học phần | Đồ án tổng hợp hướng Công nghệ phần mềm |
| Phiên bản | 1.0 — 14/10/2026 |
| Trạng thái | Đặc tả đề xuất trước triển khai |
| Mục đích | Cơ sở thống nhất để thiết kế, lập trình, kiểm thử và nghiệm thu |

Tài liệu tổng hợp phạm vi đã thảo luận và giữ mã FR01–FR12, NFR01–NFR10 để truy vết. Tất cả yêu cầu trong phạm vi phiên bản đầu đều cần triển khai. Các chỉ tiêu kỹ thuật là mục tiêu đề xuất của dự án, không phải yêu cầu nguyên văn của rubric. Tài liệu không khẳng định sản phẩm đã được triển khai hoặc kiểm thử.

## 1. Tổng quan

### 1.1. Bài toán

Chủ xe cần quản lý chi phí nhiên liệu, sửa chữa và bảo dưỡng nhưng thông tin thường nằm ở nhiều hóa đơn hoặc ghi chú riêng. Mỗi hạng mục bảo dưỡng có chu kỳ khác nhau, khiến người sử dụng khó nhớ lần thực hiện gần nhất và thời điểm cần thực hiện tiếp theo.

VehicleCare tập trung dữ liệu theo từng xe, cho phép tra cứu lịch sử, thống kê chi phí và nhắc bảo dưỡng dựa trên thời gian hoặc số kilomet đã ghi nhận.

### 1.2. Mục tiêu

- Quản lý nhiều phương tiện trong một tài khoản.
- Ghi nhận và tra cứu nhiên liệu, sửa chữa, bảo dưỡng.
- Theo dõi ODO và lịch bảo dưỡng riêng cho từng hạng mục.
- Thông báo các hạng mục sắp đến hạn, đến hạn hoặc quá hạn.
- Thống kê chi phí theo xe, thời gian và loại hoạt động.
- Thực hành phân tích yêu cầu, Clean Architecture, SOLID và kiểm thử trong phạm vi một monolith.

### 1.3. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| ODO | Tổng số kilomet hiển thị trên đồng hồ xe |
| Hoạt động | Một lần cập nhật ODO, đổ nhiên liệu hoặc thực hiện dịch vụ |
| Dịch vụ | Một lần sửa chữa/bảo dưỡng, có thể gồm nhiều hạng mục |
| Kế hoạch bảo dưỡng / Plan | Chu kỳ và mốc theo dõi của một hạng mục trên một xe |
| Baseline | Ngày/ODO làm mốc tính kỳ đầu khi chưa có lịch sử bảo dưỡng phù hợp |
| Completion | Hạng mục dịch vụ đã thực hiện và liên kết với một plan |
| Archive | Lưu trữ xe ngừng sử dụng, giữ nguyên lịch sử |

## 2. Phạm vi và người sử dụng

### 2.1. Phạm vi phiên bản đầu

| Nội dung | Quy định |
|---|---|
| Nền tảng | Web app responsive trên máy tính và điện thoại |
| Phương tiện | Xe máy và ô tô sử dụng nhiên liệu |
| Người dùng | Chủ xe cá nhân, một tài khoản có nhiều xe |
| Nhập dữ liệu | Người dùng nhập thủ công, kể cả ODO |
| Ngôn ngữ | Tiếng Việt |
| Đơn vị | VNĐ, kilomet, lít |
| Múi giờ nghiệp vụ | `Asia/Ho_Chi_Minh` |
| Môi trường | Có kết nối mạng, một backend instance và một database |

### 2.2. Tác nhân và quyền

| Tác nhân | Quyền |
|---|---|
| Khách chưa đăng nhập | Đăng ký và đăng nhập |
| Chủ xe đã đăng nhập | Quản lý hồ sơ, xe và toàn bộ dữ liệu thuộc tài khoản của mình |

Phiên bản đầu không có vai trò quản trị viên, gara hoặc tài xế được chia sẻ xe. Worker nhắc hạn là thành phần nội bộ của hệ thống.

### 2.3. Ngoài phạm vi

Không yêu cầu GPS/OBD, tự đọc ODO, dự đoán bằng AI, quản lý đội xe, đặt lịch gara, thanh toán, xe điện, offline sync, Web Push khi đóng trình duyệt, email/SMS nhắc hạn, ảnh hóa đơn, xuất CSV, tính tiêu hao nhiên liệu, chi phí/km, nhắc đăng kiểm/bảo hiểm hoặc khôi phục mật khẩu qua email. Các chức năng này là hướng mở rộng.

## 3. Yêu cầu chức năng

### FR01. Quản lý tài khoản

- Đăng ký bằng email, họ tên, mật khẩu và xác nhận mật khẩu.
- Email không trùng sau chuẩn hóa. Mật khẩu theo policy cấu hình của Identity và được mô tả trên form.
- Đăng nhập, đăng xuất, xem hồ sơ và sửa họ tên.
- Đổi mật khẩu cần mật khẩu hiện tại và xác nhận mật khẩu mới.
- Email chỉ đọc trong phiên bản đầu. Không tự xây cơ chế hash mật khẩu.

**Nghiệm thu:** email trùng hoặc mật khẩu không hợp lệ bị từ chối; sai thông tin đăng nhập không tạo phiên; đăng xuất xóa cookie phiên và cache dữ liệu phía trình duyệt; yêu cầu tiếp theo không có phiên hợp lệ nhận `401`.

### FR02. Quản lý phương tiện

- Thêm, xem danh sách, xem chi tiết và sửa thông tin xe.
- Bắt buộc: tên gợi nhớ, loại xe `Motorcycle/Car`, ngày và ODO bắt đầu theo dõi.
- Tùy chọn: hãng, dòng xe, năm sản xuất, biển số.
- Lưu trữ và khôi phục xe. Xe lưu trữ chỉ đọc, giữ lịch sử, ngừng nhận hoạt động và nhắc mới.
- Không xóa cứng xe trong giao diện phiên bản đầu. Không bắt buộc biển số duy nhất toàn hệ thống.

**Nghiệm thu:** quản lý được nhiều xe; archive không mất dữ liệu; restore đánh giá lại lịch hiện tại, không đặt lại chu kỳ.

### FR03. Quản lý ODO

- Nhập ODO thủ công với ngày ghi nhận; xem, sửa và xóa bản ghi thủ công.
- Hoạt động nhiên liệu/dịch vụ tạo bản ghi ODO liên kết.
- ODO liên kết chỉ được sửa/xóa thông qua hoạt động nguồn.
- Hiển thị ODO mới nhất, ngày cập nhật và cảnh báo dữ liệu cũ.
- Mọi thay đổi ODO phải kiểm tra tính hợp lệ và tính lại trạng thái bảo dưỡng liên quan.

**Nghiệm thu:** ODO âm hoặc không phù hợp chuỗi lịch sử bị từ chối; nhập quá khứ hợp lệ không thay ODO mới nhất bằng giá trị cũ.

### FR04. Quản lý nhiên liệu

- Thêm, xem, sửa và xóa lần đổ nhiên liệu.
- Bắt buộc: xe, ngày đổ, ODO, số lít và tổng tiền.
- Tùy chọn: ghi chú và trạng thái đổ đầy bình, mặc định chưa đánh dấu.
- Cập nhật đồng thời lịch sử ODO, dữ liệu báo cáo và trạng thái bảo dưỡng.
- Tổng tiền thực trả là nguồn tính chi phí; không yêu cầu tự tính giá nhiên liệu từ bên ngoài.

**Nghiệm thu:** số lít và tiền phải dương; sửa/xóa phản ánh đúng báo cáo; gửi lại cùng yêu cầu không tạo chi phí trùng.

### FR05. Quản lý sửa chữa và bảo dưỡng

- Thêm, xem, sửa và xóa lần dịch vụ.
- Một lần dịch vụ có ngày thực hiện, ODO, nơi thực hiện tùy chọn, ghi chú và ít nhất một hạng mục.
- Mỗi hạng mục có loại `Repair/Maintenance`, tên/nội dung và chi phí.
- Một dòng bảo dưỡng có thể liên kết với một plan cùng xe để ghi nhận hoàn thành.
- Tổng chi phí dịch vụ bằng tổng các dòng. Người dùng không nhập một tổng khác với các dòng.

**Nghiệm thu:** lưu được nhiều hạng mục trong một lần; lỗi ở một bước ghi dữ liệu phải rollback toàn bộ; sửa/xóa cập nhật lại lịch sử, lịch và báo cáo.

### FR06. Thiết lập kế hoạch bảo dưỡng

- Tạo, xem, sửa, tạm dừng và tiếp tục plan riêng cho từng xe/hạng mục.
- Cấu hình một trong ba chế độ: `Time`, `Distance`, `Either`.
- Nhập baseline, chu kỳ theo tháng/km và ngưỡng nhắc trước theo ngày/km tương ứng.
- Baseline có thể là lần thực hiện gần nhất do người dùng khai báo hoặc mốc bắt đầu theo dõi. Hệ thống phải phân biệt hai ý nghĩa này.
- Xóa plan khi chưa có lịch sử completion. Plan đã có lịch sử chỉ được tạm dừng.
- Tên plan sau chuẩn hóa không trùng trong cùng xe.

**Nghiệm thu:** cả ba chế độ hoạt động; cấu hình thiếu trường bắt buộc/chu kỳ không dương bị từ chối; sửa cấu hình không thay đổi dữ liệu dịch vụ quá khứ.

### FR07. Theo dõi trạng thái bảo dưỡng

- Hiển thị trạng thái `Unknown`, `NotDue`, `Soon`, `Due`, `Overdue` theo quy tắc tại mục 4.
- Hiển thị ngày/ODO đến hạn, số ngày/km còn lại hoặc đã vượt và ngày ODO cập nhật gần nhất.
- Với `Either`, một điều kiện đạt trước đủ để đến hạn.
- Plan tạm dừng hoặc xe lưu trữ vẫn xem được lịch sử nhưng không nằm trong danh sách nhắc đang hoạt động.

**Nghiệm thu:** đúng trạng thái tại ngưỡng trước hạn, đúng hạn và quá hạn; ODO cũ có cảnh báo riêng, không được trình bày là số đo thời gian thực.

### FR08. Ghi nhận hoàn thành bảo dưỡng

- Từ màn hình plan/nhắc hạn, mở form dịch vụ với plan được chọn sẵn.
- Người dùng nhập ngày, ODO và hạng mục thực tế rồi xác nhận.
- Chỉ các plan được liên kết mới được tính hoàn thành và chuyển sang kỳ tiếp theo.
- Sửa/xóa completion phải tính lại kỳ hiện hành từ lịch sử còn hợp lệ.
- Đọc thông báo hoặc đóng thông báo không phải hành vi hoàn thành bảo dưỡng.

**Nghiệm thu:** hoàn thành thay dầu không đặt lại lịch lọc gió; nhập một completion cũ không ghi đè completion mới hơn.

### FR09. Nhắc hạn và thông báo

- Có inbox, số thông báo hiện hành chưa đọc và thao tác đánh dấu đã đọc.
- Tạo nhắc cho trạng thái `Soon/Due/Overdue`, kèm xe, hạng mục và lý do đến hạn.
- Đánh giá ngay sau thay đổi dữ liệu liên quan; worker kiểm tra mỗi 60 giây và khi backend khởi động.
- Lưu thông báo vào database và chống tạo trùng theo plan/kỳ/mức cảnh báo.
- Frontend đang hoạt động lấy thông báo mỗi 60 giây và khi quay lại tab.
- Chỉ xin quyền thông báo trình duyệt sau thao tác của người dùng. Khi được hỗ trợ, cấp quyền và web đang mở, hiển thị thông báo mới nhận được.
- Từ chối quyền không ảnh hưởng inbox. Không cam kết browser notification khi web đóng.

**Nghiệm thu:** quét nhiều lần không sinh trùng; restart giữ lịch sử; nhắc lỗi thời không còn được tính là nhắc hiện hành.

### FR10. Tra cứu lịch sử

- Timeline tổng hợp cập nhật ODO thủ công, nhiên liệu và dịch vụ.
- Reading tự sinh từ nhiên liệu/dịch vụ không xuất hiện thành một hoạt động trùng riêng.
- Lọc theo xe, khoảng ngày, loại hoạt động; tìm theo nội dung/ghi chú.
- Phân trang phía server, sắp xếp mặc định ngày nghiệp vụ giảm dần và khóa phụ ổn định.
- Xem chi tiết và chuyển đến form sửa/xóa tương ứng. Xe lưu trữ chỉ đọc.

**Nghiệm thu:** bộ lọc kết hợp đúng; trang rỗng có thông báo; không đọc được lịch sử tài khoản khác.

### FR11. Dashboard và thống kê

- Dashboard hiển thị xe đang quản lý, chi phí tháng hiện tại, hạng mục cần chú ý và ODO cũ.
- Báo cáo theo một/tất cả xe, khoảng ngày, nhóm chi phí và từng tháng.
- Có tổng chi phí, biểu đồ và bảng dữ liệu đối chiếu.
- Có tùy chọn đưa xe lưu trữ vào báo cáo, mặc định không chọn.
- Sửa/xóa hoạt động phải cập nhật số liệu; khoảng không có dữ liệu hiển thị tổng bằng 0.

**Nghiệm thu:** tổng chi phí bằng nhiên liệu cộng các dòng sửa chữa/bảo dưỡng, không cộng lại tổng dịch vụ hoặc plan.

### FR12. Cài đặt và trải nghiệm sử dụng

- Bật/tắt nhắc bảo dưỡng và cấu hình ngưỡng cảnh báo ODO cũ, mặc định 30 ngày.
- Ngưỡng ODO cũ là số ngày nguyên dương.
- Tắt nhắc dừng tạo thông báo mới nhưng vẫn cho xem trạng thái và lịch sử. Bật lại đánh giá trạng thái hiện hành.
- Form có nhãn, đơn vị, validation, trạng thái đang lưu, thành công và thất bại.
- Danh sách có loading, empty state và retry khi lỗi; thao tác xóa cần xác nhận.
- Giao diện đáp ứng các kích thước và khả năng sử dụng trong NFR04.

**Nghiệm thu:** thiết lập được lưu theo tài khoản; từ chối notification không chặn sử dụng ứng dụng; đổi tài khoản không hiển thị cache của tài khoản trước.

## 4. Quy tắc nghiệp vụ

### BR01. Quyền sở hữu

Backend lấy người dùng từ phiên xác thực, không tin `UserId/Email` do client tự khai. Mọi truy vấn và thay đổi phải kiểm tra owner. Khi liên kết activity, reading và plan, tất cả phải thuộc cùng xe và tài khoản.

### BR02. Ngày và ODO

- Ngày nghiệp vụ lưu dạng `date`, không sau ngày hiện tại theo múi giờ Việt Nam.
- ODO là số nguyên không âm. Bản ghi bổ sung phải nằm trong khoảng hợp lệ giữa các ngày trước và sau.
- Các bản ghi cùng ngày sắp theo ODO tăng dần, cho phép bằng nhau; không suy đoán thứ tự giờ khi chỉ lưu ngày.
- ODO hiện tại là giá trị lớn nhất trong ngày ghi nhận mới nhất của chuỗi hợp lệ. Ngày cập nhật là ngày nghiệp vụ đó.
- Thêm/sửa/xóa phải kiểm tra lại chuỗi và các mốc kế hoạch bị ảnh hưởng. Nếu không còn hợp lệ, từ chối với lý do cụ thể.
- Mốc ODO ban đầu là một reading được bảo vệ, không xóa trực tiếp; điều chỉnh qua thao tác sửa mốc có kiểm tra toàn bộ dữ liệu liên quan.
- Chưa hỗ trợ thay đồng hồ hoặc ODO quay vòng. Không tự ước lượng km khi dữ liệu cũ.

### BR03. Cấu hình và baseline

| Chế độ | Dữ liệu bắt buộc |
|---|---|
| `Time` | Ngày baseline, chu kỳ tháng, ngưỡng nhắc trước theo ngày |
| `Distance` | ODO baseline, chu kỳ km, ngưỡng nhắc trước theo km |
| `Either` | Cả hai nhóm dữ liệu trên |

Chu kỳ là số nguyên dương. Ngưỡng nhắc trước là số nguyên không âm; ngưỡng km không vượt chu kỳ km, ngưỡng ngày không vượt số ngày của kỳ đang tính. Nếu độ dài kỳ thay đổi theo tháng, giới hạn ngưỡng ngày thực tế bằng độ dài kỳ đó.

Baseline ngày không ở tương lai; baseline ODO không lớn hơn ODO hiện tại. Khi người dùng biết cả ngày và ODO baseline, hai mốc phải phù hợp lịch sử đã ghi nhận. Baseline không phát sinh chi phí hay giả lập một ServiceRecord.

### BR04. Mốc và hạn tiếp theo

- Ưu tiên completion hợp lệ gần nhất theo ngày thực hiện. Nếu chưa có, dùng baseline.
- Không nhận completion liên kết nằm trước baseline ở chiều đang cấu hình; lịch sử cũ vẫn có thể ghi như dịch vụ không liên kết.
- Hạn ngày = ngày mốc cộng số tháng chu kỳ bằng phép cộng tháng lịch.
- Hạn km = ODO mốc cộng số km chu kỳ.
- Một plan chỉ được liên kết một lần trong một dịch vụ. Phiên bản đầu không nhận hai completion của cùng plan trong cùng ngày.
- Sửa chu kỳ tính lại hạn từ mốc hiện hành; sửa baseline không được làm mất tính hợp lệ của lịch sử.

### BR05. Trạng thái

| Trạng thái | Điều kiện trên từng chiều |
|---|---|
| `Overdue` | Ngày/ODO hiện tại vượt hạn |
| `Due` | Ngày/ODO hiện tại bằng hạn |
| `Soon` | Chưa đến hạn và phần còn lại không vượt ngưỡng nhắc trước |
| `NotDue` | Chưa đến vùng nhắc trước |
| `Unknown` | Không đủ dữ liệu để đánh giá |

Với `Either`, ưu tiên `Overdue > Due > Soon > NotDue` khi đủ dữ liệu. Nếu một chiều thiếu dữ liệu nhưng chiều còn lại đã `Soon/Due/Overdue`, hiển thị mức đó kèm cảnh báo thiếu dữ liệu; chỉ một chiều `NotDue` chưa đủ kết luận toàn plan `NotDue`, phải trả `Unknown`. Form bình thường phải ngăn tạo plan thiếu dữ liệu.

Plan tạm dừng, xe lưu trữ và ODO cũ là thuộc tính riêng, không thay thế trạng thái tính hạn.

**Ví dụ kiểm thử:** baseline 10.000 km, chu kỳ 3.000 km, nhắc trước 300 km: 12.699 → `NotDue`; 12.700 → `Soon`; 13.000 → `Due`; 13.001 → `Overdue`. Chu kỳ minh họa không phải hướng dẫn bảo dưỡng áp dụng cho mọi xe.

### BR06. Hoàn thành và chỉnh sửa lịch sử

Một dòng `Maintenance` liên kết plan mới được coi là completion. Một lần dịch vụ có thể hoàn thành nhiều plan khác nhau. Dòng `Repair` hoặc bảo dưỡng không liên kết không đặt lại lịch.

Sửa/xóa service phải tìm lại completion gần nhất còn hợp lệ hoặc dùng baseline, tính lại hạn và cập nhật nhắc. Chi phí, hạng mục và reading nguồn phải lưu/xóa trong cùng transaction. Không ghi dữ liệu một phần khi lỗi.

### BR07. Tiền và thống kê

- Tiền dùng `decimal`/`numeric`, đơn vị VNĐ nguyên, không dùng số thực dấu phẩy động.
- Nhiên liệu: số lít > 0, tối đa 3 chữ số thập phân; tổng tiền > 0.
- Dịch vụ: ít nhất một dòng, tiền mỗi dòng ≥ 0, tổng > 0. Phiên bản đầu chưa hỗ trợ lần dịch vụ hoàn toàn miễn phí.
- Nguồn báo cáo chỉ gồm `FuelRecords.Amount` và `ServiceItems.Amount`.
- Lọc theo ngày phát sinh thực tế, bao gồm cả ngày đầu và ngày cuối. `from > to` là lỗi.
- Sửa/xóa dữ liệu phải làm mới các tổng, biểu đồ và cache liên quan.

### BR08. Thông báo và vòng đời

- Một kỳ được xác định ổn định từ plan, mốc và cấu hình tác động đến hạn. Đổi tên hoặc đọc thông báo không tạo kỳ mới.
- Mỗi plan/kỳ/mức cảnh báo có tối đa một notification. Khi tăng mức có thể tạo một thông báo mới cho mức mới.
- Nhắc không còn phù hợp được đánh dấu `Superseded`, giữ để tra cứu, không tính vào badge hiện hành.
- Nếu dữ liệu điều chỉnh quay về cùng kỳ/mức đã có, cập nhật/tái sử dụng notification thay vì tạo bản sao.
- Worker khởi động lại phải đánh giá hạn hiện tại. Khi server dừng, không cam kết tạo nhắc đúng thời điểm.
- Pause/archive/tắt nhắc dừng thông báo chủ động. Resume/restore/bật nhắc đánh giá lại mà không đặt lại chu kỳ.

### BR09. Trùng yêu cầu và sửa đồng thời

- Tạo nhiên liệu/dịch vụ có `RequestId`: cùng ID và payload trả kết quả đã tạo; cùng ID khác payload trả `409`.
- Update/delete dùng version token. Version cũ trả `409`, người dùng tải lại thay vì ghi đè im lặng.
- Các mutation ảnh hưởng chuỗi ODO/lịch phải kiểm soát cạnh tranh theo xe, không chỉ theo từng bản ghi.

## 5. Yêu cầu phi chức năng

| Mã | Yêu cầu | Tiêu chí kiểm chứng |
|---|---|---|
| NFR01 | Xác thực và phân quyền | Hai tài khoản không đọc/sửa/xóa hoặc liên kết dữ liệu của nhau; API bảo vệ không có phiên trả 401 |
| NFR02 | Bảo mật web | HTTPS khi triển khai; cookie HttpOnly/Secure/SameSite phù hợp; kiểm tra CSRF khi thay đổi dữ liệu; login có lockout/rate limit; secrets ngoài source |
| NFR03 | Toàn vẹn dữ liệu | FK/check/unique constraint; rollback khi ghi lỗi; không cộng trùng chi phí; xung đột version trả 409 |
| NFR04 | Khả năng sử dụng | Dùng được ở 360/768/1440px; không tràn toàn trang; table được cuộn riêng; có label, keyboard focus và trạng thái bằng chữ |
| NFR05 | Hiệu năng | Với 10.000 hoạt động, 10 người dùng đồng thời, API danh sách/báo cáo p95 ≤ 1 giây sau warmup trên máy demo; ghi rõ cấu hình và kịch bản đo |
| NFR06 | Nhắc hạn và phục hồi | Khi server hoạt động bình thường, tạo nhắc thời gian trong 120 giây sau hạn; tab đang hoạt động nhận trong tối đa 60 giây tiếp theo; restart không mất/trùng nhắc |
| NFR07 | Khả năng bảo trì | Chiều phụ thuộc Clean Architecture đúng; logic tính hạn có unit test; build/test/lint/typecheck đạt |
| NFR08 | Tái lập và bền vững | README chạy được từ checkout sạch; migration/seed rõ; restart giữ dữ liệu; thực hiện thử backup/restore |
| NFR09 | Độ đúng dữ liệu | Kiểm thử cuối tháng, ngày địa phương/UTC, tiền, ODO, phạm vi ngày và sửa lịch sử |
| NFR10 | Quan sát và lỗi | ProblemDetails có mã lỗi/traceId; log không chứa mật khẩu/token; worker lỗi có log và tiếp tục vòng sau; health check database |

Không đăng ký SLA vận hành liên tục, tải hàng triệu người dùng hoặc nhiều backend instance. Kết quả hiệu năng và kiểm thử chỉ được công bố sau khi đo thực tế.

## 6. Công nghệ và kiến trúc dự kiến

### 6.1. Stack

| Thành phần | Công nghệ đã chọn |
|---|---|
| Frontend | React, TypeScript, Vite, React Router |
| Giao diện | Material UI bản cộng đồng |
| State và form | TanStack Query; React Hook Form + Zod |
| HTTP và biểu đồ | Fetch wrapper; Chart.js + react-chartjs-2 |
| Backend | ASP.NET Core Web API trên .NET 10 |
| Database | PostgreSQL 17, EF Core 10, Npgsql tương thích |
| Authentication | ASP.NET Core Identity + cookie authentication |
| Nhắc hạn | BackgroundService + PeriodicTimer |
| API và log | OpenAPI, Swagger UI ở dev/demo, ILogger |
| Kiểm thử | xUnit, PostgreSQL test riêng, Vitest/React Testing Library, Playwright |
| Môi trường | Docker Compose, Git, CI build/test |

Pin phiên bản ổn định sau khi kiểm tra tương thích và commit lockfile. Frontend và `/api` cùng origin khi triển khai; Vite proxy API trong môi trường phát triển.

### 6.2. Backend monolith

| Project | Trách nhiệm | Phụ thuộc |
|---|---|---|
| `VehicleCare.Domain` | Entity, invariant, logic tính hạn thuần | Không phụ thuộc project khác |
| `VehicleCare.Application` | Use case, DTO, interface persistence/current user/clock | Domain |
| `VehicleCare.Infrastructure` | EF Core, migrations, repository, Identity, tích hợp worker | Application, Domain |
| `VehicleCare.Api` | Controller, middleware, auth, OpenAPI, đăng ký DI | Application; Infrastructure tại composition root |

Backend triển khai thành một ứng dụng dùng một database. Controller mỏng, không tính lịch hoặc truy vấn DbContext trực tiếp. Application không tham chiếu Infrastructure. Một evaluator dùng chung cho màn hình, mutation và worker.

### 6.3. Pattern và quy ước

- Áp dụng DI, Application Service, repository theo nhu cầu nghiệp vụ, DTO và Unit of Work mỏng dựa trên DbContext.
- Áp dụng SOLID qua phân tách trách nhiệm, interface nhỏ và phụ thuộc hướng vào trong; không tạo abstraction nếu không có mục đích.
- Dùng `Result` cho lỗi nghiệp vụ dự kiến, `ProblemDetails` cho response lỗi; không trả mọi lỗi bằng HTTP 200.
- Worker tạo scope riêng, không dùng chung DbContext đồng thời với request.
- FE tổ chức theo feature; Query quản lý server state, form quản lý dữ liệu nhập, local state quản lý UI. Clear cache khi logout/đổi tài khoản.
- Không yêu cầu microservices, Redis, message broker, Kubernetes, MediatR hoặc CQRS tách database.

## 7. Dữ liệu và giao tiếp

### 7.1. Các thực thể chính

| Thực thể | Dữ liệu / quan hệ chính |
|---|---|
| User | Identity, email, họ tên; sở hữu nhiều xe |
| UserSettings | Bật nhắc, ngưỡng ODO cũ |
| Vehicle | Owner, tên, loại, thông tin xe, archive, version |
| OdometerReading | Xe, ngày, ODO, nguồn manual/initial/fuel/service |
| FuelRecord | Xe, ngày, reading, lít, tiền, đầy bình, ghi chú, requestId, version |
| ServiceRecord | Xe, ngày, reading, nơi thực hiện, ghi chú, requestId, version |
| ServiceItem | Dịch vụ cha, loại, tên, tiền, plan tùy chọn |
| MaintenancePlan | Xe, hạng mục, mode, baseline, chu kỳ, ngưỡng, pause, version |
| Notification | Owner, plan, kỳ, mức, nội dung, thời điểm tạo/đọc/supersede |

Mỗi hoạt động nguồn sở hữu một reading riêng. Completion suy ra từ ServiceItem liên kết plan, không ghi thêm một khoản chi phí riêng. Dùng FK, constraint và index cho owner, xe/ngày, plan và notification. Không cascade-delete lịch sử khi archive xe.

### 7.2. Hợp đồng API

- Nhóm API: auth, vehicles, odometer-readings, fuel-records, service-records, maintenance-plans/status, activities, reports, notifications và settings.
- Request/response sử dụng DTO; không trả EF entity/navigation trực tiếp.
- Danh sách trả `items`, `page`, `pageSize`, `totalCount`; mặc định 20 bản ghi, tối đa 100.
- Ngày nghiệp vụ dùng `YYYY-MM-DD`; timestamp kỹ thuật dùng UTC.
- Status: `201` tạo mới; `200/204` thành công; `400` dữ liệu sai; `401` chưa xác thực; `403` yêu cầu bị cấm như CSRF; `404` không tồn tại/ngoài quyền; `409` xung đột; `500` lỗi bất ngờ.
- Lỗi có `code`, thông điệp, `traceId`, lỗi theo trường nếu có. Không trả stack trace hoặc secrets.
- Endpoint và schema chi tiết được duy trì trong OpenAPI khi triển khai.

## 8. Màn hình và use case

| Use case | Màn hình chính | Yêu cầu |
|---|---|---|
| UC01 — Quản lý phiên | Đăng ký, đăng nhập | FR01 |
| UC02 — Quản lý xe | Danh sách, form, chi tiết xe | FR02 |
| UC03 — Cập nhật ODO | Reading và lịch sử ODO | FR03 |
| UC04 — Quản lý nhiên liệu | Form và chi tiết nhiên liệu | FR04 |
| UC05 — Ghi dịch vụ/hoàn thành plan | Form nhiều hạng mục | FR05, FR08 |
| UC06 — Thiết lập lịch | Danh sách và form plan | FR06 |
| UC07 — Xem/xử lý nhắc | Trạng thái, inbox | FR07, FR09 |
| UC08 — Tra cứu lịch sử | Timeline, bộ lọc | FR10 |
| UC09 — Xem báo cáo | Dashboard, thống kê | FR11 |
| UC10 — Hồ sơ/cài đặt | Họ tên, mật khẩu, thiết lập nhắc | FR01, FR12 |

**Luồng trọng tâm:** đăng nhập → thêm xe → thiết lập plan → ghi nhiên liệu/ODO → thấy nhắc hạn → ghi bảo dưỡng → xem kỳ mới và thống kê.

Mọi use case bảo vệ cần phiên hợp lệ. Nhánh lỗi chung: validation, không có quyền, dữ liệu đã thay đổi, lỗi mạng/database. Chỉ báo lưu thành công sau khi backend xác nhận. Scenario chi tiết cần mô tả tiền điều kiện, luồng chính, nhánh thay thế và hậu điều kiện theo cùng mã trên.

## 9. Kiểm thử và nghiệm thu

| Mã | Tình huống bắt buộc | Kết quả mong đợi |
|---|---|---|
| AT01 | Đăng ký email trùng, login sai, logout | Không tạo trùng/phiên sai; logout xóa trạng thái người dùng |
| AT02 | Tài khoản A truy cập hoặc liên kết dữ liệu của B | Không đọc hoặc thay đổi được |
| AT03 | Archive/restore xe | Giữ lịch sử, ngừng/khôi phục nhắc theo trạng thái hiện tại |
| AT04 | ODO âm, thấp hơn mốc trước, nhập reading quá khứ | Từ chối dữ liệu sai, không làm lùi ODO mới nhất |
| AT05 | Retry tạo nhiên liệu; sửa/xóa chi phí | Không tạo trùng, báo cáo cập nhật đúng |
| AT06 | Ghi dịch vụ nhiều dòng, một bước ghi bị lỗi | Tổng đúng; rollback toàn bộ khi lỗi |
| AT07 | Time/Distance/Either, trước/đúng/sau hạn, cuối tháng | Đúng công thức và ưu tiên trạng thái |
| AT08 | Hoàn thành một plan, nhập completion cũ, sửa/xóa mới nhất | Chỉ plan liên quan đổi kỳ; mốc tính lại đúng |
| AT09 | Worker quét lặp, restart, pause/archive và permission denied | Không mất/trùng nhắc; inbox vẫn dùng được |
| AT10 | Nhiên liệu 200.000 + sửa 100.000 + bảo dưỡng 150.000 | Tổng 450.000 VNĐ, không cộng trùng |
| AT11 | Hai tab sửa cùng version | Yêu cầu đến sau nhận 409 và hướng dẫn tải lại |
| AT12 | Responsive, lỗi mạng, không có dữ liệu, keyboard | UI rõ trạng thái và dùng được ở kích thước mục tiêu |
| AT13 | Dataset/tải mục tiêu, checkout sạch, restart, backup/restore | Có kết quả đo và bằng chứng đáp ứng NFR05/NFR08 |

Unit test tập trung tính hạn, tiền và ngày. Integration test dùng PostgreSQL để kiểm tra constraint, quyền và transaction. E2E kiểm tra luồng trọng tâm. Dùng clock/dữ liệu kiểm thử kiểm soát được; không chờ ngày thực tế để test nhắc hạn.

### Điều kiện hoàn thành

- Toàn bộ FR01–FR12 và NFR01–NFR10 có bằng chứng nghiệm thu.
- Không còn lỗi chặn luồng chính hoặc truy cập dữ liệu chéo tài khoản.
- Test, build, lint và typecheck đạt; database giữ dữ liệu sau restart.
- README tái lập được môi trường; API và báo cáo khớp sản phẩm.
- Mỗi test có bước chạy, expected/actual, Pass/Fail và bằng chứng; không coi test dự kiến là test đã chạy.

## 10. Kế hoạch và sản phẩm bàn giao

| Thời gian | Công việc / đầu ra |
|---|---|
| Tuần 1–2 | Khảo sát sản phẩm liên quan, phân tích nghiệp vụ, feature list và công nghệ |
| Tuần 3–4 | Use-case diagram/scenario, thiết kế dữ liệu và kiến trúc sơ bộ |
| Tuần 5–6 | Mockup, screen flow, giao diện và các luồng nền |
| Tuần 7–8 | Demo giữa kỳ |
| Tuần 9–11 | Hoàn thiện chức năng, nhắc hạn, báo cáo và kiểm thử |
| Tuần 12–14 | Sửa lỗi, báo cáo cuối kỳ, slide và demo toàn dự án |

Theo tài liệu học phần: nộp báo cáo trước 11h thứ Sáu tuần 3, 8, 13 và gặp định kỳ hai tuần. Ngày cụ thể theo lịch lớp. Phân công phải dùng tên thành viên và khối lượng công việc thực tế.

**Bàn giao:** mã nguồn, migration/seed, Docker Compose, README, feature/workload list, use-case diagram/scenario, mockup/screen flow, ERD/kiến trúc, OpenAPI, kết quả kiểm thử, báo cáo và slide/demo. Triển khai server là mục tiêu phục vụ demo nếu điều kiện cho phép.

**Đối chiếu rubric:** Progress 10%, Final report 40%, Demo 50%. Báo cáo cần giới thiệu/feature list, phân công, UC/công nghệ, UI/screen flow, implementation và testing; demo phải thể hiện chức năng đã đăng ký. Không bổ sung chức năng mở rộng vào cam kết nghiệm thu khi chưa chốt thay đổi phạm vi.

## 11. Cơ sở và quản lý thay đổi

Tài liệu dựa trên mô tả VehicleCare của người dùng, bản `VehicleCare_Specification.md`, hồ sơ tuần 1–4 và các tài liệu tiến độ/rubric đã cung cấp. Phiên bản này cô đọng và làm rõ quy tắc để triển khai, không thay các minh chứng khảo sát hoặc kết quả kiểm thử thực tế.

Mọi thay đổi phạm vi sau khi chốt cần ghi phiên bản, lý do và FR/NFR liên quan; cập nhật đồng thời use case, test case và tài liệu báo cáo. Thông tin học phần, giảng viên, thành viên và phân công được bổ sung theo dữ liệu thật.
