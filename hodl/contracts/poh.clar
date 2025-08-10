(define-data-var btc-price uint u29000) ;; mock BTC price in USD

(define-map loans
  {id: uint}
  {lender: principal, borrower: principal, collateral-btc-address: (string-ascii 64),
   collateral-btc-amount: uint, loan-amount: uint, status: uint}) ;; 0=active,1=repaid,2=defaulted

(define-data-var loan-counter uint u0)

;; admin sets mock price
(define-public (set-mock-price (price uint))
  (ok (var-set btc-price price)))

;; lender creates loan
(define-public (create-loan (loan-amount uint))
  (let ((id (var-get loan-counter)))
    (var-set loan-counter (+ id u1))
    (map-set loans {id: id}
      {lender: tx-sender,
       borrower: contract-caller, ;; placeholder
       collateral-btc-address: "",
       collateral-btc-amount: u0,
       loan-amount: loan-amount,
       status: u0})
    (ok id)))

;; borrower accepts loan
(define-public (accept-loan (id uint) (btc-addr (string-ascii 64)) (btc-amt uint))
  (let ((loan (unwrap! (map-get? loans {id: id}) (err "Loan not found"))))
    (map-set loans {id: id}
      {lender: (get lender loan),
       borrower: tx-sender,
       collateral-btc-address: btc-addr,
       collateral-btc-amount: btc-amt,
       loan-amount: (get loan-amount loan),
       status: u0})
    (ok true)))

;; liquidation if collateral value < 120% of loan
(define-public (liquidate-loan (id uint))
  (let ((loan (unwrap! (map-get? loans {id: id}) (err "Loan not found"))))
    (let ((collateral (* (get collateral-btc-amount loan) (var-get btc-price)))
          (loan-value (get loan-amount loan)))
      (if (< collateral (* loan-value u120))
          (begin
            (map-set loans {id: id}
              {lender: (get lender loan),
               borrower: (get borrower loan),
               collateral-btc-address: (get collateral-btc-address loan),
               collateral-btc-amount: (get collateral-btc-amount loan),
               loan-amount: (get loan-amount loan),
               status: u2})
            (ok "Loan liquidated"))
          (err "Collateral sufficient")))))

;; === READ-ONLY FUNCTIONS ===

;; Get a specific loan by ID
(define-read-only (get-loan (id uint))
  (map-get? loans {id: id}))

;; Get current loan counter
(define-read-only (get-loan-counter)
  (var-get loan-counter))

;; Get current BTC price
(define-read-only (get-btc-price)
  (var-get btc-price))