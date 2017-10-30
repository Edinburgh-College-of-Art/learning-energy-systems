<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        Learning Energy Dashboard
    </title>
    <link rel="icon" href="/dashboard/img/favicon.png" type="image/x-icon" />


    <!--[if lt IE 9]>
    <script src='http://html5shiv.googlecode.com/svn/trunk/html5.js'></script>
    <![endif]-->
    <?= $this->Html->css('style.css') ?>
    <?= $this->Html->css('fonts.css') ?>
    <?= $this->Html->css('jquery-ui.css') ?>
    <?= $this->Html->script('moment') ?>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
    <?= $this->Html->script('spin') ?>
    <?= $this->Html->script('jquery-ui') ?>

    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <?= $this->fetch('script') ?>
</head>
<body style="padding:1%">

<?= $this->fetch('content') ?>

</body>
</html>
