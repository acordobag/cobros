CREATE DEFINER = CURRENT_USER TRIGGER `cobros`.`accounts_AFTER_UPDATE` AFTER UPDATE ON `accounts` FOR EACH ROW
BEGIN
	IF NEW.actualAmmount = 0 THEN 
		UPDATE cobros.accounts SET alreadyPay = 1 WHERE id = NEW.id; 
    END IF;
END
