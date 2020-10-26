pragma solidity ^0.5.0;

contract MarketApp {
    address owner; // コントラクトオーナーのアドレス
    uint256 public numItems; // 商品数
    bool public stopped; // trueの場合Circuit Breakerが発動し，全てのコントラクトが使用不可能になる

    // コンストラクタ
    constructor() public {
        owner = msg.sender; // コントラクトをデプロイしたアドレスをオーナーに指定する
        numItems = 0;
        stopped = false;
    }

    // 呼び出しがコントラクトのオーナーか確認
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // 呼び出しがアカウント登録済みのEthアドレスか確認
    modifier onlyUser {
        require(accounts[msg.sender].resistered);
        _;
    }

    // ===========================
    // 取引を行うためのステートと関数
    // ===========================

    // アカウント情報
    struct account {
        string name; //名前
        string email; //Emailアドレス
        uint256 numTransactions; //取引回数
        int256 reputations; //取引評価、大きい値ほど良いアカウント
        bool resistered; //アカウント未登録:false, 登録済み:true
        int256 numSell; //出品した商品の数
        int256 numBuy; //購入した商品の数
    }

    address[] public users; // ユーザーのアドレス

    mapping(address => account) accounts;

    mapping(address => uint256[]) public sellItems;
    mapping(address => uint256[]) public buyItems;

    function registerAccount(string memory _name, string memory _email)
        public
        returns (bool)
    {
        //アカウントが登録されていなければ新規会員登録をする
        if (!isUserExist(msg.sender)) {
            accounts[msg.sender].resistered = true;
        }
        accounts[msg.sender].name = _name;
        accounts[msg.sender].email = _email;
        return true;
    }

    // アカウント情報（個人情報）
    function viewAccount(address user)
        public
        view
        returns (string memory, string memory)
    {
        string memory _name = accounts[user].name;
        string memory _email = accounts[user].email;

        return (_name, _email);
    }

    // アカウント情報（取引）
    function viewAccount_Transaction(address user)
        public
        view
        returns (
            uint256,
            int256,
            int256,
            int256
        )
    {
        uint256 _numTransactions = accounts[user].numTransactions;
        int256 _reputations = accounts[user].reputations;
        int256 _numSell = accounts[user].numSell;
        int256 _numBuy = accounts[user].numBuy;

        return (_numTransactions, _reputations, _numSell, _numBuy);
    }

    function isUserExist(address user) public view returns (bool) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == user) {
                return true;
            }
        }
        return false;
    }

    // 商品情報
    struct item {
        address payable sellerAddr; // 出品者のEthアドレス
        address payable buyerAddr; // 購入者のEthアドレス
        string seller; // 出品者名
        string name; // 商品名
        string description; // 商品説明
        uint256 price; // 価格(単位：wei)
        bool payment; // false:未支払い, true:支払済み
        bool shipment; // false:未発送, true:発送済み
        bool receivement; // false:未受取り, true:受取済み
        bool sellerReputate; // 出品者の評価完了ステート, false:未評価, true:評価済み
        bool buyerReputate; // 購入者の評価完了ステート, false:未評価, true:評価済み
        bool stopSell; // false:出品中, true:出品取消し
    }
    mapping(uint256 => item) public items;

    // 商品画像の在り処
    // solidityの構造体は12個までしかメンバを持てないので，商品画像の在り処はitemのメンバにすることができません。
    // そこで，新たにimagesというデータ構造体を作成します。
    struct image {
        string googleDocID; // googleドライブのファイルのid
        string ipfsHash; // IPFSのファイルハッシュ
    }
    mapping(uint256 => image) public images;

    // 出品する関数
    function sell(
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _googleDocID,
        string memory _ipfsHash
    ) public {
        items[numItems].sellerAddr = msg.sender; // 出品者のEthアドレス
        items[numItems].seller = accounts[msg.sender].name; // 出品者名
        items[numItems].name = _name; // 商品名
        items[numItems].description = _description; // 商品説明
        items[numItems].price = _price; // 商品価格
        images[numItems].googleDocID = _googleDocID; // googleドライブのファイルid
        images[numItems].ipfsHash = _ipfsHash; // IPFSのファイルハッシュ
        accounts[msg.sender].numSell++; // 各アカウントが出品した商品数の更新
        sellItems[msg.sender].push(numItems); // 各アカウントが出品した商品の番号を記録
        numItems++; // 出品されている商品数を１つ増やす
    }

    // 購入する関数
    // 代金は購入者が商品を受取るまでコントラクトに預けられます
    function buy(uint256 _numItems) public payable onlyUser isStopped {
        require(!items[_numItems].payment); // 商品が売り切れていないか確認
        require(!items[_numItems].stopSell); // 出品取消しになっていないか確認

        require(items[_numItems].price == msg.value); // 入金金額が商品価格と一致しているか確認

        items[_numItems].payment = true; // 支払済みにする
        items[_numItems].stopSell = true; // 売れたので出品をストップする
        items[_numItems].buyerAddr = msg.sender; // 購入者のEthアドレスを登録する
        accounts[msg.sender].numBuy++; // 各アカウントが購入した商品数の更新
        buyItems[msg.sender].push(_numItems); // 各アカウントが購入した商品の番号を記録
    }

    // 発送完了を通知する関数
    function ship(uint256 _numItems) public onlyUser isStopped {
        require(items[_numItems].sellerAddr == msg.sender); // 呼び出しが出品者か確認
        require(items[_numItems].payment); // 入金済み商品か確認
        require(!items[_numItems].shipment); // 未発送の商品か確認

        items[_numItems].shipment = true; // 発送済みにする
    }

    // 商品受取の通知と出品者へ代金を送金する関数
    function receive(uint256 _numItems) public payable onlyUser isStopped {
        require(items[_numItems].buyerAddr == msg.sender); // 呼び出しが購入者か確認
        require(items[_numItems].shipment); // 発送済み商品か確認
        require(!items[_numItems].receivement); // 受取前の商品か確認

        items[_numItems].receivement = true; // 受取済みにする
        // 受取りが完了したら出品者に代金を送金する

        items[_numItems].sellerAddr.transfer(items[_numItems].price);
    }

    // 取引評価を行う
    // 購入者が出品者を評価する関数
    function sellerEvaluate(uint256 _numItems, int256 _reputate)
        public
        onlyUser
        isStopped
    {
        require(items[_numItems].buyerAddr == msg.sender); // 呼び出しが購入者か確認
        require(items[_numItems].receivement); // 商品の受取が完了していることを確認
        require(_reputate >= 1 && _reputate <= 3); // 評価は1 ~ 3の範囲で行う
        require(!items[_numItems].sellerReputate); // 出品者の評価が完了をしていないことを確認

        items[_numItems].sellerReputate = true; // 評価済みにする
        accounts[items[_numItems].sellerAddr].numTransactions++; // 出品者の取引回数の加算
        accounts[items[_numItems].sellerAddr].reputations += _reputate; // 出品者の評価の更新
    }

    // 出品者が購入者を評価する関数
    function buyerEvaluate(uint256 _numItems, int256 _reputate)
        public
        onlyUser
        isStopped
    {
        require(items[_numItems].sellerAddr == msg.sender); // 呼び出しが出品者か確認
        require(items[_numItems].receivement); // 商品の受取が完了していることを確認
        require(_reputate >= 1 && _reputate <= 3); // 評価は1 ~ 3の範囲で行う
        require(!items[_numItems].buyerReputate); // 購入者の評価が完了をしていないことを確認

        items[_numItems].buyerReputate = true; // 評価済みにする
        accounts[items[_numItems].buyerAddr].numTransactions++; // 購入者の取引回数の加算
        accounts[items[_numItems].buyerAddr].reputations += _reputate; // 購入者の評価の更新
    }

    // ================
    // セキュリティー対策
    // ================

    // Circuit Breaker
    modifier isStopped {
        require(!stopped);
        _;
    }

    // Circuit Breakerを発動，停止する関数
    function toggleCircuit(bool _stopped) public onlyOwner {
        stopped = _stopped;
    }

    // コントラクトを破棄して，残金をオーナーに送る関数
    // クラッキング対策
    // function kill() public onlyOwner {
    //     selfdestruct(owner);
    // }
}
