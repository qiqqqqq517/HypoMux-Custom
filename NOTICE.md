# 修改声明 / Modification Notice

本仓库是 **HypoMux 定制版（HypoMux Custom）**，属于对上游 HypoMux 的**修改版本**，不是上游官方发布。

This repository is **HypoMux Custom**, a **modified version** of the upstream HypoMux project. It is **not** an official upstream release.

---

## 上游来源 / Upstream

| 项 | 值 |
|---|---|
| 项目 | HypoMux |
| 上游仓库 | <https://github.com/Hypostasis-Cat/HypoMux> |
| 上游作者 | Hypostasis-Cat 及 HypoMux 贡献者 |
| 本定制版基线 | 上游 `v2.7.0`（提交 `427e4ec`） |
| 官方网站（上游） | <https://hypomux.com> |

## 许可证 / License

- 本仓库沿用上游许可证：**GNU Affero General Public License v3.0**，全文见 [LICENSE](LICENSE)。
- 许可证**未被修改**。
- 依 AGPL-3.0 §5(a)，本文件即「显著的修改声明」，说明本作品被修改过、修改时间，以及修改内容。
- 依 AGPL-3.0，本修改版的**完整对应源码**即本仓库本身，任何人都可以获取、修改与再分发，条件同样是遵守 AGPL-3.0。
- 本仓库**不提供**预编译的签名安装包。上游官方安装包请到上游仓库的 Releases 获取。

## 修改者与时间 / Modifier and date

- 修改者：[@qiqqqqq517](https://github.com/qiqqqqq517)
- 修改时间：2026-10-05
- 修改版本号：`1.0.0`（独立版本线，与上游 `2.x` 序列无关）

## 修改内容 / Changes

1. **移除 AI 助手与小 Mux 伴侣模块**（彻底删除源码，而非用开关关闭）
   - Go：`desktop/internal/services/ai_*.go`（13 个文件）、`desktop/internal/platform/wails/companion_export.go`
   - Go：`settings.go` 移除 `AIEnabled` 字段与 `aiExecution` 锁；`main.go` 移除 `AIService` 装配
   - 前端：`src/components/ai/` 整树（含分层 / Live2D 皮肤与衣柜）、`platform/ai.ts`、`state/aiAvailability.ts`、`companionExport.ts`
   - 资源：`public/skins/`、`public/live2d/`、`scripts/create-layered-skin.py`
   - 文档：`docs/AI_ASSISTANT.md`、`docs/AI_FEATURE_SWITCH.md`、`docs/AI_PROVIDER_COMPATIBILITY.md`
   - 依赖：移除 `fflate`、`pixi.js`、`pixi-live2d-display`、`fake-indexeddb`
2. **优化 UDP 每数据报热路径**（改动均有可复测的实测数据，详见提交信息）
   - `scheduler`：`watchLatency` 不再每包抢占 `s.mu`，改读原子发布快照
   - `udp`：flow key 改用 `netip.AddrPort`，`host:port` 字符串只在新建流时构造一次
   - `udp`：`SetReadDeadline` 由每包设置改为到期才重设
   - `health`：`candidates` 的 4 次切片分配合并为 1 次
   - `steam_observer`：移除每请求一次的无效 map 初始化
3. **派生版标识与版本线**
   - 仓库名、README 与本文件明确标注为定制版；应用标题栏与托盘提示追加「定制版」
   - 使用独立版本线：`desktop/VERSION` 改为 `1.0.0`，并用仓库自带工具
     `go -C desktop run ./cmd/release-version -write` 同步全部 12 个版本载体
     （`build/config.yml`、`build/windows/info.json`、msix 清单、NSIS 脚本、
     `frontend/package.json`、`src/product.ts`、`internal/services/updater.go` 等）
   - 移除指向不存在仓库的 `website` 子模块（上游 `hypomux-web` 已 404），
     使 clone 不再产生坏子模块
4. **CI 触发方式调整**
   - 保留上游 4 条 workflow（它们承载上游签名发布链路，删除会让
     `installer_layout_test.go` 的 5 个发布链路测试失败），但把
     `build.yml` 与 `go-engine.yml` 的触发由 `push`/`pull_request` 改为**仅手动**
     `workflow_dispatch`，避免推送到本仓库时自动运行并因缺少上游密钥而失败
   - 新增 `.github/workflows/validate.yml`：只做构建与测试校验，不签名、不发布
5. **修正一处与版本号耦合的测试夹具**
   - `desktop/internal/services/updater_test.go` 原著以 `major-1.0.0` 生成「更旧版本」
     候选，且 CNB 夹具固定使用 `0.0.0`。本定制版主版本为 1 时二者相撞，更新器会
     判定「同一版本两源元数据不一致」而报错（属夹具碰撞，非逻辑缺陷）。
     已在主版本 ≤1 时改用 `0.0.1`，并保留原注释说明。

## 未修改的部分 / Unmodified

以下内容**原样保留**，以维持归属与可追溯性：

- `LICENSE`（AGPL-3.0 全文）
- 全部源码文件中的版权声明与作者署名
- Go module 路径 `github.com/Hypostasis-Cat/HypoMux/...` 与二进制/服务名（改动它们会破坏 Wails 绑定生成与安装包链路，且保留上游标识更符合署名要求）
- 上游的提交历史

## 免责 / Disclaimer

- 本仓库与上游作者 **无隶属关系**，也**未获得**上游作者的背书或担保。
- 本仓库**不是**官方网站、不是官方发布渠道。
- 二进制/源码按 AGPL-3.0 第 15、16 条**不提供任何担保**。
- 使用本软件即表示你理解：网络接管类工具会修改系统代理与路由设置，请仅在你有授权的设备与网络上使用，并自行评估风险。
