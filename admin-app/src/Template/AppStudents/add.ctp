<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List App Students'), ['action' => 'index']) ?></li>
    </ul>
</div>

<?= $this->Flash->render() ?>

<div class="appStudents form large-10 medium-9 columns">
    <?= $this->Form->create($appStudent) ?>
    <fieldset>
        <legend><?= __('Add App Student') ?></legend>
        <?php
            echo $this->Form->input('name');
            echo $this->Form->input('app_school_id');
            echo $this->Form->input('year');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
